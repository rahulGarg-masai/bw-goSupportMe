const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');
const { MongoClient } = require('mongodb');
const cron = require('node-cron');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// In-memory storage
let onlineUsers = new Map();
let chatMessages = [];

// Redis client setup
let redisClient;
(async () => {
  try {
    redisClient = redis.createClient({
      url: 'redis://localhost:6379'
    });
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.log('Redis connection failed, using memory only:', error.message);
  }
})();

// MongoDB setup
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'chatapp';
const COLLECTION_NAME = 'messages';

let mongoClient;
(async () => {
  try {
    mongoClient = new MongoClient(MONGO_URI);
    await mongoClient.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('MongoDB connection failed:', error.message);
  }
})();

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User registration
  socket.on('register', async (userData) => {
    const { username, isAdmin } = userData;
    
    if (!username || username.trim() === '') {
      socket.emit('registrationError', 'Username is required');
      return;
    }

    // Check if username is already taken
    const existingUser = Array.from(onlineUsers.values()).find(user => user.username === username);
    if (existingUser) {
      socket.emit('registrationError', 'Username already taken');
      return;
    }

    // Register the user
    onlineUsers.set(socket.id, {
      username,
      isAdmin: isAdmin || false,
      socketId: socket.id
    });

    socket.emit('registrationSuccess', { username, isAdmin });
    
    // Broadcast updated online users list
    io.emit('onlineUsers', Array.from(onlineUsers.values()));
    
    // Send recent chat history to the new user
    try {
      let recentMessages = [];
      if (redisClient && redisClient.isOpen) {
        const messagesFromRedis = await redisClient.lRange('chat:messages', -50, -1);
        recentMessages = messagesFromRedis.map(msg => JSON.parse(msg));
      } else {
        recentMessages = chatMessages.slice(-50);
      }
      socket.emit('chatHistory', recentMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      socket.emit('chatHistory', chatMessages.slice(-50));
    }

    console.log(`User registered: ${username} (Admin: ${isAdmin})`);
  });

  // Handle chat messages
  socket.on('sendMessage', async (messageData) => {
    const user = onlineUsers.get(socket.id);
    
    if (!user) {
      socket.emit('error', 'You must be registered to send messages');
      return;
    }

    const message = {
      id: Date.now() + Math.random(),
      username: user.username,
      text: messageData.text,
      timestamp: new Date(),
      isAdmin: user.isAdmin
    };

    // Store message in memory
    chatMessages.push(message);
    
    // Keep only last 1000 messages in memory
    if (chatMessages.length > 1000) {
      chatMessages = chatMessages.slice(-1000);
    }

    // Store in Redis
    try {
      if (redisClient && redisClient.isOpen) {
        await redisClient.lPush('chat:messages', JSON.stringify(message));
        await redisClient.lTrim('chat:messages', -1000, -1); // Keep only last 1000 messages
      }
    } catch (error) {
      console.error('Redis error:', error);
    }

    // Broadcast message to all users
    io.emit('newMessage', message);
  });

  // Handle admin announcements
  socket.on('sendAnnouncement', async (announcementData) => {
    const user = onlineUsers.get(socket.id);
    
    if (!user || !user.isAdmin) {
      socket.emit('error', 'Only admins can send announcements');
      return;
    }

    const announcement = {
      id: Date.now() + Math.random(),
      username: user.username,
      text: announcementData.text,
      timestamp: new Date(),
      isAdmin: true,
      isAnnouncement: true
    };

    // Store announcement in memory
    chatMessages.push(announcement);
    
    // Store in Redis
    try {
      if (redisClient && redisClient.isOpen) {
        await redisClient.lPush('chat:messages', JSON.stringify(announcement));
      }
    } catch (error) {
      console.error('Redis error:', error);
    }

    // Broadcast announcement to all users
    io.emit('newMessage', announcement);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      onlineUsers.delete(socket.id);
      io.emit('onlineUsers', Array.from(onlineUsers.values()));
      console.log(`User disconnected: ${user.username}`);
    }
  });

  // Handle manual disconnect
  socket.on('manualDisconnect', () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      onlineUsers.delete(socket.id);
      io.emit('onlineUsers', Array.from(onlineUsers.values()));
      console.log(`User manually disconnected: ${user.username}`);
    }
    socket.disconnect();
  });
});

// Cron job to backup messages to MongoDB every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running backup to MongoDB...');
  
  if (!mongoClient) {
    console.log('MongoDB not connected, skipping backup');
    return;
  }

  try {
    let messagesToBackup = [];
    
    if (redisClient && redisClient.isOpen) {
      const messagesFromRedis = await redisClient.lRange('chat:messages', 0, -1);
      messagesToBackup = messagesFromRedis.map(msg => JSON.parse(msg));
    } else {
      messagesToBackup = chatMessages;
    }

    if (messagesToBackup.length > 0) {
      const db = mongoClient.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);
      
      // Insert messages that don't already exist
      for (const message of messagesToBackup) {
        await collection.updateOne(
          { id: message.id },
          { $set: message },
          { upsert: true }
        );
      }
      
      console.log(`Backed up ${messagesToBackup.length} messages to MongoDB`);
    }
  } catch (error) {
    console.error('Backup error:', error);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
  }
  
  if (mongoClient) {
    await mongoClient.close();
  }
  
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
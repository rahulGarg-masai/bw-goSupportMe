# Real-time Group Chat Application

A real-time group chat application built with Node.js, Express, Socket.IO, Redis, and MongoDB.

## Features

- **User Registration**: Users can register with a username and optional admin privileges
- **Real-time Messaging**: Instant messaging between all connected users
- **Online Users List**: Display of currently online users with admin badges
- **Admin Announcements**: Admin users can send special announcement messages
- **Chat History**: Persistent chat history using Redis for fast retrieval
- **Data Backup**: Periodic backup of chat messages to MongoDB using cron jobs
- **Manual Disconnect**: Users can disconnect using a UI button
- **Responsive Design**: Works on both desktop and mobile devices

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **Redis Server** (running on localhost:6379)
- **MongoDB** (running on localhost:27017)

### Installing Redis (Windows)

1. Download Redis for Windows from: https://github.com/microsoftarchive/redis/releases
2. Extract and run `redis-server.exe`
3. Redis will start on port 6379

### Installing MongoDB (Windows)

1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. MongoDB will start on port 27017

## Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

1. Make sure Redis and MongoDB are running
2. Start the application:

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

3. Open your browser and navigate to: `http://localhost:3000`

## Usage

### User Registration
1. Enter a username
2. Optionally check "Admin User" for admin privileges
3. Click "Join Chat"

### Sending Messages
- Type your message in the input field and press Enter or click "Send"
- Admin users have an additional "Send Announcement" feature

### Admin Features
- Admin users can send announcements that appear with special styling
- Admin messages are marked with an "ADMIN" badge

### Disconnecting
- Click the "Disconnect" button to leave the chat
- Users are automatically removed when they close their browser

## Technical Details

### Architecture
- **Backend**: Node.js with Express server
- **Real-time Communication**: Socket.IO for bidirectional communication
- **Data Storage**: 
  - In-memory arrays for active session data
  - Redis for fast chat history retrieval (last 1000 messages)
  - MongoDB for persistent backup storage
- **Background Jobs**: Cron job runs every hour to backup messages to MongoDB

### Key Socket Events
- `register`: User registration
- `sendMessage`: Regular chat message
- `sendAnnouncement`: Admin announcement
- `manualDisconnect`: User-initiated disconnect
- `newMessage`: Broadcast new messages
- `onlineUsers`: Update online users list
- `chatHistory`: Send recent message history

### Data Flow
1. Messages are stored in server memory (last 1000)
2. Messages are pushed to Redis list (last 1000)
3. Every hour, a cron job backs up all messages to MongoDB
4. New users receive recent chat history from Redis

## File Structure

```
q2/
├── server.js              # Main server file
├── package.json           # Project dependencies
├── public/                # Frontend files
│   ├── index.html         # Main HTML page
│   ├── style.css          # Styling
│   └── script.js          # Client-side JavaScript
└── README.md              # This file
```

## Error Handling

- **Username Conflicts**: Users cannot register with existing usernames
- **Redis/MongoDB Offline**: Application gracefully falls back to in-memory storage
- **Connection Issues**: Automatic reconnection and error messages
- **Admin Privileges**: Non-admin users cannot send announcements

## Development Notes

- The application uses graceful shutdown to properly close database connections
- Chat history is limited to the last 1000 messages for performance
- The cron job prevents duplicate messages during MongoDB backup
- Responsive design ensures usability on mobile devices

## Troubleshooting

1. **Port 3000 in use**: Change the PORT in server.js or set environment variable
2. **Redis connection failed**: Ensure Redis server is running on localhost:6379
3. **MongoDB connection failed**: Ensure MongoDB is running on localhost:27017
4. **Messages not persisting**: Check Redis and MongoDB connections in server logs
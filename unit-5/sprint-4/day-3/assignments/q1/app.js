const EventEmitter = require('events');

class NotificationSystem extends EventEmitter {
  constructor() {
    super();
    this.setupListeners();
  }

  setupListeners() {
    this.on('userLoggedIn', (username) => {
      console.log(`> User ${username} logged in`);
      console.log(`> Notification sent to ${username}`);
    });

    this.on('messageReceived', (from, to, message) => {
      console.log(`> Message from ${from} to ${to}: ${message}`);
    });

    this.on('dataSynced', () => {
      console.log('> Data sync complete');
    });

    this.on('syncStarted', () => {
      console.log('> Syncing user data...');
    });
  }

  simulateUserLogin(username) {
    setTimeout(() => {
      this.emit('userLoggedIn', username);
      this.startDataSync();
    }, 500);
  }

  startDataSync() {
    setTimeout(() => {
      this.emit('syncStarted');
      setTimeout(() => {
        this.emit('dataSynced');
      }, 1500);
    }, 1000);
  }

  simulateMessageReceived(from, to, message) {
    setTimeout(() => {
      this.emit('messageReceived', from, to, message);
    }, 2000);
  }
}

const notificationSystem = new NotificationSystem();

notificationSystem.simulateUserLogin('John');
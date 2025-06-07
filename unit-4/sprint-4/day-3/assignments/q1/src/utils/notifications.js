export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const sendNotification = (title, body, icon = null) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/vite.svg',
      badge: '/vite.svg'
    });
  }
};

export const scheduleReminder = () => {
  const now = new Date();
  const reminderTime = new Date();
  reminderTime.setHours(20, 0, 0, 0);
  
  if (now > reminderTime) {
    reminderTime.setDate(reminderTime.getDate() + 1);
  }
  
  const timeUntilReminder = reminderTime.getTime() - now.getTime();
  
  setTimeout(() => {
    sendNotification(
      'Daily Study Tracker Reminder',
      "Don't forget to log your study habits and reflection for today!",
    );
    scheduleReminder();
  }, timeUntilReminder);
};

export const celebrateStreak = (streakCount) => {
  const messages = [
    { streak: 1, message: "Great start! You've logged your first day! 🌟" },
    { streak: 3, message: "3 days strong! You're building a habit! 💪" },
    { streak: 7, message: "One week streak! You're on fire! 🔥" },
    { streak: 14, message: "Two weeks! Your dedication is inspiring! ✨" },
    { streak: 30, message: "30 days! You're a habit master! 🏆" },
    { streak: 50, message: "50 days! Incredible consistency! 🎉" },
    { streak: 100, message: "100 days! You're absolutely amazing! 🌈" }
  ];
  
  const celebration = messages.find(m => m.streak === streakCount);
  if (celebration) {
    sendNotification('Streak Celebration!', celebration.message);
  }
};

export const getMotivationalMessage = () => {
  const messages = [
    "Every small step counts towards your goals! 🎯",
    "Consistency is the key to success! 🗝️",
    "You're building great habits! Keep it up! 💪",
    "Reflection helps you grow stronger! 🌱",
    "Your future self will thank you! ⭐",
    "Progress, not perfection! 📈",
    "You're investing in yourself! 💎",
    "Small daily improvements lead to stunning results! 🚀"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

export const checkMissedDays = (lastEntryDate) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (lastEntryDate < yesterdayStr) {
    const daysMissed = Math.floor((new Date(today) - new Date(lastEntryDate)) / (1000 * 60 * 60 * 24));
    
    if (daysMissed === 1) {
      sendNotification(
        'Gentle Reminder',
        "You missed yesterday's entry. No worries, let's get back on track today! 🌟"
      );
    } else if (daysMissed > 1) {
      sendNotification(
        'We Miss You!',
        `It's been ${daysMissed} days since your last entry. Your wellness journey is waiting for you! 💙`
      );
    }
  }
};

export const calculateCurrentStreak = (data) => {
  if (data.length === 0) return 0;
  
  const sortedEntries = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  let currentDate = new Date(today);
  
  for (let entry of sortedEntries) {
    const entryDate = entry.date;
    const expectedDate = currentDate.toISOString().split('T')[0];
    
    if (entryDate === expectedDate) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

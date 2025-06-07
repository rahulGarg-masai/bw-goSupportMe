# Project Tracker Setup Instructions

## Firebase Configuration

Before running the application, you need to set up Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication with Email/Password
4. Enable Realtime Database
5. Copy your Firebase configuration

## Update Firebase Configuration

Replace the placeholder values in `src/firebase.js` with your actual Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

Also update the BASE_URL in `src/services/firebaseService.js`:

```javascript
const BASE_URL = 'https://your-project-default-rtdb.firebaseio.com';
```

## Firebase Database Rules

Set up your Realtime Database rules for security:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## Running the Application

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open your browser and navigate to the provided localhost URL

## Features

- User authentication (signup/login)
- Create, read, update, delete projects
- Add, edit, delete tasks within projects
- Task filtering by priority and completion status
- Task sorting by date and priority
- Debounced search functionality
- Pagination for tasks
- Real-time updates using Firebase
- Protected routes for authenticated users

## Technology Stack

- React 19
- React Router DOM
- Firebase Authentication
- Firebase Realtime Database
- Axios for HTTP requests
- Context API for state management
- Vite for build tooling

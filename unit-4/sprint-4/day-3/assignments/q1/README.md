# StudyWell Tracker

A comprehensive platform where students log their daily study habits, reflect on mental wellness, and receive gentle feedback based on self-reported patterns.

## Features

### Core Features
- **Daily Study & Wellness Tracker**: Log study hours, break time, sleep, stress level, and focus
- **Markdown-supported Reflections**: Write daily reflections with markdown formatting
- **Activity Heatmap**: Visual representation of productive days over the last 30 days
- **Streak Tracking**: Celebrate daily streaks with motivating messages
- **Insight Engine**: Personalized insights after 7 days of logging

### User Roles
- **Student**: Log daily habits and view personal insights
- **Academic Mentor**: View anonymized student entries and provide supportive feedback

### Advanced Features
- **Smart Notifications**: Gentle reminders and streak celebrations
- **PDF Export**: Download monthly summaries of your wellness journey
- **Real-time Insights**: Data-driven suggestions for better study habits
- **Mentor Dashboard**: Filter and comment on student entries with focus area suggestions

## Technology Stack
- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Authentication**: Firebase Auth with Context API
- **Database**: Firebase Realtime Database
- **HTTP Client**: Axios
- **Markdown**: React Markdown
- **PDF Generation**: jsPDF
- **Styling**: Inline CSS with modern responsive design

## Setup Instructions

1. **Clone and Install**
   ```bash
   cd q1
   npm install
   ```

2. **Firebase Configuration**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Enable Realtime Database
   - Copy your config and update `src/firebase.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

3. **Run the Application**
   ```bash
   npm run dev
   ```

## Usage Guide

### For Students
1. **Sign Up/Login**: Create an account or login
2. **Daily Tracking**: Navigate to "Daily Tracker" to log your daily habits
3. **View Progress**: Check your dashboard for streaks and activity heatmap
4. **Get Insights**: Visit "Insights" page after 7 days for personalized feedback
5. **Export Data**: Download your wellness journey as PDF

### For Mentors
1. **Access Mentor Dashboard**: Navigate to "Mentor" section
2. **Filter Entries**: Use filters to find students who need attention
3. **Add Comments**: Provide positive feedback and suggestions
4. **Monitor Patterns**: View anonymized data to understand student wellness trends

## Key Features Explained

### Insight Engine
After 7 days of logging, the system provides insights like:
- "You focus better after 8+ hours of sleep"
- "Longer breaks seem to reduce stress levels"
- Personalized recommendations based on your patterns

### Notification System
- Daily reminders at 8 PM to log entries
- Streak celebrations at milestones (1, 3, 7, 14, 30, 50, 100 days)
- Gentle nudges for missed days
- Motivational messages with each entry

### Mentor Features
- View anonymized student entries (privacy-first approach)
- Filter by stress level, focus, and performance
- Add supportive comments and suggestions
- Automated focus area recommendations

### Data Export
- Monthly PDF summaries with insights and entries
- Complete reflection timeline
- Visual progress tracking

## Privacy & Security
- All student data is anonymized in mentor view
- Firebase security rules protect user data
- Optional opt-in for mentor visibility
- Secure authentication with Firebase Auth

## Browser Compatibility
- Modern browsers with notification support
- Progressive Web App features
- Responsive design for mobile and desktop

## Development
Built with modern React patterns:
- Context API for state management
- Protected routes for authentication
- Custom hooks for data fetching
- Utility functions for notifications and calculations

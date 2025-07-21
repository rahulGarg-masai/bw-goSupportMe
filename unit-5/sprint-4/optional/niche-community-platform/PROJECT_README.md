# Niche Community Platform

A modern, feature-rich community platform built with React, Firebase, and Redux Toolkit. This platform enables users to discover, join, and actively participate in niche communities based on their interests.

## 🌟 Features

### Core Features
- **User Authentication**: Secure sign-up/sign-in with Firebase Auth
- **Community Discovery**: Browse and join interest-based communities
- **Interactive Posts**: Create rich text posts with image upload support
- **Real-time Updates**: Live feed updates using Firebase Realtime Database
- **Voting System**: Upvote/downvote posts with real-time count updates
- **Reaction System**: Express reactions with emojis
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Rich Text Editor**: Full-featured editor using Quill.js
- **Threaded Comments**: Nested comment system (structure ready)
- **Feed Algorithms**: Multiple sorting options (Latest, Hot, Best, Controversial)

### Technical Features
- **Progressive Web App (PWA) Ready**: Optimized for mobile and desktop
- **Real-time Animations**: Smooth transitions using Framer Motion
- **State Management**: Redux Toolkit for predictable state updates
- **Firebase Integration**: Authentication, Firestore, Storage, and Realtime DB
- **Modern React**: Hooks, functional components, and latest patterns
- **TypeScript Support**: Ready for TypeScript migration
- **Dark Mode**: System preference detection

## 🚀 Tech Stack

- **Frontend**: React 18 (via Vite)
- **State Management**: Redux Toolkit
- **Backend/Database**: Firebase
  - Firebase Authentication
  - Cloud Firestore (Database)
  - Firebase Storage (Media)
  - Firebase Realtime Database
- **Styling**: CSS with CSS Grid and Flexbox
- **Animations**: Framer Motion
- **Rich Text Editor**: React Quill
- **Routing**: React Router DOM

## 📂 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Layout/
│   │   ├── Navigation/
│   │   └── LoadingStates/
│   ├── auth/
│   │   ├── LoginForm/
│   │   ├── SignupForm/
│   │   └── ProtectedRoute/
│   ├── community/
│   │   ├── CommunityCard/
│   │   ├── CommunityList/
│   │   └── CommunityHeader/
│   ├── posts/
│   │   ├── PostCard/
│   │   ├── PostEditor/
│   │   └── PostDetail/
│   └── feed/
│       ├── FeedContainer/
│       ├── FeedFilters/
│       └── FeedItem/
├── hooks/
│   ├── useAuth.js
│   ├── useCommunity.js
│   └── useRealtime.js
├── services/
│   ├── firebase.js
│   ├── api.js
│   └── recommendations.js
├── store/
│   ├── authSlice.js
│   ├── communitySlice.js
│   └── feedSlice.js
└── utils/
    ├── constants.js
    ├── helpers.js
    └── validators.js
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd niche-community-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Firebase Storage
   - Enable Realtime Database

4. **Set up Environment Variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Fill in your Firebase configuration details in the `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com/
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

1. **Authentication**: Sign up or sign in with email/password
2. **Explore Communities**: Browse available communities on the dashboard
3. **Join Discussions**: Click on a community to view and interact with posts
4. **Create Posts**: Use the rich text editor to create engaging content
5. **Engage**: Vote on posts, add reactions, and participate in discussions

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

The project uses environment variables to securely store Firebase configuration. All variables are prefixed with `VITE_` to make them available in the Vite build process.

### Required Variables
- `VITE_FIREBASE_API_KEY` - Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Your Firebase app ID
- `VITE_FIREBASE_DATABASE_URL` - Your Firebase Realtime Database URL

### Optional Variables
- `VITE_FIREBASE_MEASUREMENT_ID` - Google Analytics measurement ID

### Security Notes
- Never commit the `.env` file to version control
- Use different Firebase projects for development and production
- Consider using Firebase security rules to protect your data
- The `.env` file is included in `.gitignore` for security

## 🌐 Database Schema

### Users Collection
```javascript
{
  uid: string,
  displayName: string,
  email: string,
  avatar: string,
  bio: string,
  interests: array,
  joinedCommunities: array,
  achievements: array,
  createdAt: timestamp
}
```

### Communities Collection
```javascript
{
  name: string,
  description: string,
  category: string,
  tags: array,
  memberCount: number,
  rules: array,
  admins: array,
  createdAt: timestamp
}
```

### Posts Collection
```javascript
{
  communityId: string,
  userId: string,
  title: string,
  content: string,
  votes: number,
  reactions: object,
  commentCount: number,
  createdAt: timestamp
}
```

## 🎨 Features in Detail

### Real-time Feed
- Live updates using Firebase Realtime Database
- Multiple sorting algorithms (Latest, Hot, Best, Controversial)
- Infinite scroll with virtual scrolling (ready for implementation)
- Activity indicators showing trending posts and active discussions

### Rich Text Editor
- Full-featured Quill.js integration
- Image upload to Firebase Storage
- Auto-save draft functionality (ready for implementation)
- Support for formatting, lists, code blocks, and media embeds

### Voting & Reactions
- Real-time upvote/downvote system
- Emoji reactions with customizable options
- Vote history tracking
- Optimistic UI updates for better UX

### Responsive Design
- Mobile-first approach
- Breakpoints: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- Dark mode support based on system preferences
- Touch-friendly interfaces

## 🚀 Deployment

The app is built with Vite and can be deployed to various platforms:

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🔮 Future Enhancements

- [ ] Push notifications for post replies and mentions
- [ ] Advanced search and filtering
- [ ] User profiles and customization
- [ ] Community management tools
- [ ] Achievement system and leaderboards
- [ ] Live polls and Q&A sessions
- [ ] Mobile app using React Native
- [ ] AI-powered content recommendations
- [ ] Video/audio post support
- [ ] Community analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and the React ecosystem
- Firebase for backend services
- Framer Motion for animations
- Quill.js for rich text editing
- The open-source community

---

Built with ❤️ for niche communities worldwide.
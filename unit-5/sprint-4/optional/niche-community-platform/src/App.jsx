import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CommunityCard from './components/community/CommunityCard'
import FeedContainer from './components/feed/FeedContainer'
import './App.css'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  
  // Mock data for demonstration
  const mockCommunities = [
    {
      id: '1',
      name: 'React Developers',
      description: 'A community for React developers to share knowledge, ask questions, and collaborate on projects.',
      category: 'Technology & Programming',
      memberCount: 15420,
      tags: ['react', 'javascript', 'frontend', 'web-development'],
      createdAt: new Date('2023-01-15'),
    },
    {
      id: '2', 
      name: 'Fitness & Wellness',
      description: 'Join our supportive community focused on health, fitness, and overall wellness. Share your journey!',
      category: 'Health & Fitness',
      memberCount: 8934,
      tags: ['fitness', 'health', 'wellness', 'motivation'],
      createdAt: new Date('2023-03-22'),
    },
    {
      id: '3',
      name: 'Digital Artists',
      description: 'Showcase your digital art, get feedback, and connect with fellow artists from around the world.',
      category: 'Arts & Entertainment',
      memberCount: 12567,
      tags: ['digital-art', 'creativity', 'design', 'illustration'],
      createdAt: new Date('2023-02-10'),
    }
  ];
  
  const { userData } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {userData?.displayName || 'User'}! 👋</h1>
        <p>Explore communities, share your thoughts, and connect with like-minded people.</p>
      </div>

      {!selectedCommunity ? (
        <div className="communities-section">
          <h2>Discover Communities</h2>
          <div className="communities-grid">
            {mockCommunities.map(community => (
              <CommunityCard
                key={community.id}
                community={community}
                onClick={(community) => setSelectedCommunity(community)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="community-view">
          <div className="community-header-bar">
            <button 
              className="back-button"
              onClick={() => setSelectedCommunity(null)}
            >
              ← Back to Communities
            </button>
            <div className="community-title">
              <h2>{selectedCommunity.name}</h2>
              <p>{selectedCommunity.description}</p>
            </div>
          </div>
          
          <FeedContainer
            communityId={selectedCommunity.id}
            currentUserId={userData?.uid || 'demo-user'}
          />
        </div>
      )}
    </div>
  );
}

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />
          } 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />}
        />
      </Routes>
    </div>
  )
}

export default App

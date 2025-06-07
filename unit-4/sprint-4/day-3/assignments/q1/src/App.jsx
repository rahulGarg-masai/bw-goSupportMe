import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DailyTracker from './pages/DailyTracker';
import Insights from './pages/Insights';
import MentorDashboard from './pages/MentorDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/tracker" element={
              <PrivateRoute>
                <DailyTracker />
              </PrivateRoute>
            } />
            <Route path="/insights" element={
              <PrivateRoute>
                <Insights />
              </PrivateRoute>
            } />
            <Route path="/mentor" element={
              <PrivateRoute>
                <MentorDashboard />
              </PrivateRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

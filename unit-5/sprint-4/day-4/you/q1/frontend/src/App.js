import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ResourceList from './components/Resources/ResourceList';
import ResourceForm from './components/Resources/ResourceForm';
import ResourceDetail from './components/Resources/ResourceDetail';
import Profile from './components/Profile/Profile';
import UserManagement from './components/Admin/UserManagement';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated() ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/register" 
          element={!isAuthenticated() ? <Register /> : <Navigate to="/dashboard" />} 
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
          path="/resources" 
          element={
            <ProtectedRoute>
              <ResourceList />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/resources/new" 
          element={
            <ProtectedRoute>
              <ResourceForm />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/resources/:id" 
          element={
            <ProtectedRoute>
              <ResourceDetail />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/resources/:id/edit" 
          element={
            <ProtectedRoute>
              <ResourceForm />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute roles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={
            isAuthenticated() ? 
            <Navigate to="/dashboard" /> : 
            <Navigate to="/login" />
          } 
        />
        
        <Route 
          path="*" 
          element={
            <div className="container">
              <div className="card">
                <h2>404 - Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/dashboard" className="btn btn-primary">
                  Go to Dashboard
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, hasRole } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            RBAC App
          </Link>
          
          <div className="navbar-nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/profile">Profile</Link>
            
            {hasRole(['admin']) && (
              <Link to="/admin/users">Users</Link>
            )}
            
            <span>Welcome, {user?.username}</span>
            <span className={`role-badge role-${user?.role}`}>
              {user?.role}
            </span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
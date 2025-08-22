import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { resourceAPI } from '../../services/api';

const Dashboard = () => {
  const { user, hasRole } = useAuth();
  const [stats, setStats] = useState({
    totalResources: 0,
    myResources: 0,
    recentResources: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [allResourcesRes, myResourcesRes] = await Promise.all([
        resourceAPI.getAll({ limit: 5 }),
        resourceAPI.getAll({ limit: 5 }),
      ]);

      setStats({
        totalResources: allResourcesRes.data.pagination.totalResources,
        myResources: allResourcesRes.data.resources.filter(
          (resource) => resource.createdBy._id === user.id
        ).length,
        recentResources: allResourcesRes.data.resources.slice(0, 5),
      });
    } catch (error) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getRoleSpecificContent = () => {
    switch (user.role) {
      case 'admin':
        return (
          <div className="card">
            <h3>Admin Dashboard</h3>
            <p>Welcome, Administrator! You have full access to the system.</p>
            <ul>
              <li>Manage all users and their roles</li>
              <li>View and manage all resources</li>
              <li>Access system-wide statistics</li>
              <li>Moderate content and user activities</li>
            </ul>
          </div>
        );
      case 'moderator':
        return (
          <div className="card">
            <h3>Moderator Dashboard</h3>
            <p>Welcome, Moderator! You can moderate resources and assist users.</p>
            <ul>
              <li>View user profiles</li>
              <li>Moderate resources and content</li>
              <li>Help users with their resources</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="card">
            <h3>User Dashboard</h3>
            <p>Welcome, {user.username}! Manage your resources and profile.</p>
            <ul>
              <li>Create and manage your resources</li>
              <li>View public resources from other users</li>
              <li>Update your profile information</li>
            </ul>
          </div>
        );
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <h3>Quick Stats</h3>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <h4 style={{ color: '#007bff', marginBottom: '0.5rem' }}>
                {stats.totalResources}
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                Total Resources
              </p>
            </div>
            <div>
              <h4 style={{ color: '#28a745', marginBottom: '0.5rem' }}>
                {stats.myResources}
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                My Resources
              </p>
            </div>
          </div>
        </div>

        {getRoleSpecificContent()}
      </div>

      <div className="card">
        <h3>Recent Resources</h3>
        {stats.recentResources.length === 0 ? (
          <div className="empty-state">
            <p>No resources found. Create your first resource!</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {stats.recentResources.map((resource) => (
              <div key={resource._id} className="resource-card">
                <h4>{resource.title}</h4>
                <p>{resource.description.substring(0, 100)}...</p>
                <div className="resource-meta">
                  <span>By {resource.createdBy.username}</span>
                  <span className={`status-badge status-${resource.status}`}>
                    {resource.status}
                  </span>
                </div>
                <div className="tag">
                  {resource.category}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="/resources/new" className="btn btn-primary">
              Create New Resource
            </a>
            <a href="/resources" className="btn btn-secondary">
              View All Resources
            </a>
            <a href="/profile" className="btn btn-secondary">
              Update Profile
            </a>
          </div>
        </div>

        <div className="card">
          <h3>Account Information</h3>
          <div>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> 
              <span className={`role-badge role-${user.role}`} style={{ marginLeft: '0.5rem' }}>
                {user.role}
              </span>
            </p>
            <p><strong>Member since:</strong> {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
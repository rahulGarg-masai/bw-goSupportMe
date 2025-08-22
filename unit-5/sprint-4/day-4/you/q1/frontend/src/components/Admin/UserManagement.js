import React, { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll(currentPage, 10);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    if (userId === user.id) {
      setError('You cannot change your own role');
      return;
    }

    try {
      await userAPI.updateRole(userId, newRole);
      setSuccess('User role updated successfully');
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update user role');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === user.id) {
      setError('You cannot delete your own account');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await userAPI.delete(userId);
        setSuccess('User deleted successfully');
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete user');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="container">
      <h1>User Management</h1>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <div className="card">
        <h3>All Users ({pagination.totalUsers})</h3>
        
        {users.length === 0 ? (
          <div className="empty-state">
            <p>No users found</p>
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Username</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Role</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Joined</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userItem) => (
                    <tr key={userItem._id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <strong>{userItem.username}</strong>
                          {userItem._id === user.id && (
                            <span style={{ 
                              marginLeft: '0.5rem', 
                              fontSize: '12px', 
                              color: '#666',
                              fontStyle: 'italic' 
                            }}>
                              (You)
                            </span>
                          )}
                        </div>
                        {userItem.profile?.firstName && (
                          <small style={{ color: '#666' }}>
                            {userItem.profile.firstName} {userItem.profile.lastName}
                          </small>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>{userItem.email}</td>
                      <td style={{ padding: '1rem' }}>
                        {userItem._id === user.id ? (
                          <span className={`role-badge role-${userItem.role}`}>
                            {userItem.role}
                          </span>
                        ) : (
                          <select
                            value={userItem.role}
                            onChange={(e) => handleRoleUpdate(userItem._id, e.target.value)}
                            className="role-badge"
                            style={{ 
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: 'inherit'
                            }}
                          >
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                          </select>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <small style={{ color: '#666' }}>
                          {new Date(userItem.createdAt).toLocaleDateString()}
                        </small>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => window.open(`/profile/${userItem._id}`, '_blank')}
                            className="btn btn-secondary"
                            style={{ fontSize: '12px', padding: '4px 8px' }}
                          >
                            View
                          </button>
                          {userItem._id !== user.id && (
                            <button
                              onClick={() => handleDeleteUser(userItem._id)}
                              className="btn btn-danger"
                              style={{ fontSize: '12px', padding: '4px 8px' }}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="btn"
                >
                  Previous
                </button>
                
                <span>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="card">
        <h3>User Statistics</h3>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#007bff', marginBottom: '0.5rem' }}>
              {users.filter(u => u.role === 'admin').length}
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Admins</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#ffc107', marginBottom: '0.5rem' }}>
              {users.filter(u => u.role === 'moderator').length}
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Moderators</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#28a745', marginBottom: '0.5rem' }}>
              {users.filter(u => u.role === 'user').length}
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
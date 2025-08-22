import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { resourceAPI } from '../../services/api';

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();
  
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    try {
      const response = await resourceAPI.getById(id);
      setResource(response.data.resource);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load resource');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this resource? This action cannot be undone.')) {
      try {
        await resourceAPI.delete(id);
        navigate('/resources');
      } catch (error) {
        setError('Failed to delete resource');
      }
    }
  };

  const canEdit = () => {
    if (!resource || !user) return false;
    return hasRole(['admin', 'moderator']) || resource.createdBy._id === user.id;
  };

  const canDelete = () => {
    if (!resource || !user) return false;
    return hasRole(['admin', 'moderator']) || resource.createdBy._id === user.id;
  };

  if (loading) {
    return <div className="loading">Loading resource...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">
          {error}
        </div>
        <Link to="/resources" className="btn btn-secondary">
          Back to Resources
        </Link>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container">
        <div className="alert alert-error">
          Resource not found
        </div>
        <Link to="/resources" className="btn btn-secondary">
          Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Link to="/resources" className="btn btn-secondary">
          ← Back to Resources
        </Link>
        
        {canEdit() && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link 
              to={`/resources/${resource._id}/edit`} 
              className="btn btn-primary"
            >
              Edit Resource
            </Link>
            {canDelete() && (
              <button 
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete Resource
              </button>
            )}
          </div>
        )}
      </div>

      <div className="card">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '1rem' }}>{resource.title}</h1>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className={`status-badge status-${resource.status}`}>
              {resource.status}
            </span>
            <span className="tag">{resource.category}</span>
            <span className={`tag priority-${resource.metadata?.priority || 'medium'}`}>
              Priority: {resource.metadata?.priority || 'medium'}
            </span>
            {resource.metadata?.isPublic && (
              <span className="tag">Public</span>
            )}
          </div>

          {resource.tags && resource.tags.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              {resource.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Description</h3>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px', 
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6'
          }}>
            {resource.description}
          </div>
        </div>

        <div className="grid grid-2">
          <div>
            <h4>Resource Information</h4>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <p><strong>Category:</strong> {resource.category}</p>
              <p><strong>Status:</strong> {resource.status}</p>
              <p><strong>Priority:</strong> {resource.metadata?.priority || 'medium'}</p>
              <p><strong>Visibility:</strong> {resource.metadata?.isPublic ? 'Public' : 'Private'}</p>
            </div>
          </div>

          <div>
            <h4>Created By</h4>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <p><strong>Username:</strong> {resource.createdBy.username}</p>
              <p><strong>Email:</strong> {resource.createdBy.email}</p>
              <p>
                <strong>Role:</strong>{' '}
                <span className={`role-badge role-${resource.createdBy.role}`}>
                  {resource.createdBy.role}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '2rem', fontSize: '12px', color: '#999' }}>
          <div className="grid grid-2">
            <div>
              <strong>Created:</strong> {new Date(resource.createdAt).toLocaleString()}
            </div>
            {resource.updatedAt !== resource.createdAt && (
              <div>
                <strong>Last Updated:</strong> {new Date(resource.updatedAt).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {hasRole(['admin', 'moderator']) && (
        <div className="card">
          <h3>Admin/Moderator Actions</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {!canEdit() && (
              <>
                <button 
                  onClick={() => navigate(`/resources/${resource._id}/edit`)}
                  className="btn btn-primary"
                >
                  Override Edit
                </button>
                <button 
                  onClick={handleDelete}
                  className="btn btn-danger"
                >
                  Force Delete
                </button>
              </>
            )}
            <Link 
              to={`/admin/users/${resource.createdBy._id}`}
              className="btn btn-secondary"
            >
              View Creator Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceDetail;
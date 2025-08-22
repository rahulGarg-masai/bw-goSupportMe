import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { resourceAPI } from '../../services/api';

const ResourceList = () => {
  const { user, hasRole } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    category: '',
    status: '',
    search: '',
  });

  useEffect(() => {
    fetchResources();
  }, [filters]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await resourceAPI.getAll(filters);
      setResources(response.data.resources);
      setPagination(response.data.pagination);
    } catch (error) {
      setError('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleDelete = async (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourceAPI.delete(resourceId);
        fetchResources();
      } catch (error) {
        setError('Failed to delete resource');
      }
    }
  };

  const canEdit = (resource) => {
    return hasRole(['admin', 'moderator']) || resource.createdBy._id === user.id;
  };

  const canDelete = (resource) => {
    return hasRole(['admin', 'moderator']) || resource.createdBy._id === user.id;
  };

  if (loading) {
    return <div className="loading">Loading resources...</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Resources</h1>
        <Link to="/resources/new" className="btn btn-primary">
          Create Resource
        </Link>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Filters</h3>
        <div className="grid grid-2">
          <div className="form-group">
            <label>Search</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search resources..."
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="task">Task</option>
              <option value="post">Post</option>
              <option value="item">Item</option>
              <option value="document">Document</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {resources.length === 0 ? (
        <div className="empty-state">
          <h3>No resources found</h3>
          <p>Create your first resource to get started!</p>
          <Link to="/resources/new" className="btn btn-primary">
            Create Resource
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-2">
            {resources.map((resource) => (
              <div key={resource._id} className="resource-card">
                <h3>
                  <Link to={`/resources/${resource._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {resource.title}
                  </Link>
                </h3>
                
                <p>{resource.description.substring(0, 150)}...</p>
                
                <div className="resource-meta">
                  <div>
                    <span>By {resource.createdBy.username}</span>
                    <span className={`role-badge role-${resource.createdBy.role}`} style={{ marginLeft: '0.5rem' }}>
                      {resource.createdBy.role}
                    </span>
                  </div>
                  <span className={`status-badge status-${resource.status}`}>
                    {resource.status}
                  </span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <span className="tag">{resource.category}</span>
                  {resource.tags?.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="resource-actions">
                  <Link 
                    to={`/resources/${resource._id}`} 
                    className="btn btn-secondary"
                    style={{ textDecoration: 'none' }}
                  >
                    View
                  </Link>
                  
                  {canEdit(resource) && (
                    <Link 
                      to={`/resources/${resource._id}/edit`} 
                      className="btn btn-primary"
                      style={{ textDecoration: 'none' }}
                    >
                      Edit
                    </Link>
                  )}
                  
                  {canDelete(resource) && (
                    <button 
                      onClick={() => handleDelete(resource._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div style={{ fontSize: '12px', color: '#999', marginTop: '1rem' }}>
                  Created: {new Date(resource.createdAt).toLocaleDateString()}
                  {resource.updatedAt !== resource.createdAt && (
                    <span> • Updated: {new Date(resource.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            ))}
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
  );
};

export default ResourceList;
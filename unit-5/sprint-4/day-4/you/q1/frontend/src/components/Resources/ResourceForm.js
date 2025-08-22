import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resourceAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const ResourceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    status: 'active',
    tags: [],
    metadata: {
      priority: 'medium',
      isPublic: true,
    },
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchResource();
    }
  }, [id, isEditing]);

  const fetchResource = async () => {
    try {
      const response = await resourceAPI.getById(id);
      const resource = response.data.resource;
      setFormData({
        title: resource.title,
        description: resource.description,
        category: resource.category,
        status: resource.status,
        tags: resource.tags || [],
        metadata: {
          priority: resource.metadata.priority || 'medium',
          isPublic: resource.metadata.isPublic !== undefined ? resource.metadata.isPublic : true,
        },
      });
    } catch (error) {
      setError('Failed to load resource');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('metadata.')) {
      const metadataKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [metadataKey]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isEditing) {
        await resourceAPI.update(id, formData);
        setSuccess('Resource updated successfully!');
      } else {
        await resourceAPI.create(formData);
        setSuccess('Resource created successfully!');
      }
      
      setTimeout(() => {
        navigate('/resources');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} resource`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>{isEditing ? 'Edit Resource' : 'Create New Resource'}</h1>

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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength="200"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              maxLength="1000"
            />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="task">Task</option>
                <option value="post">Post</option>
                <option value="item">Item</option>
                <option value="document">Document</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              {formData.tags.map((tag) => (
                <span key={tag} className="tag" style={{ cursor: 'pointer' }}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    style={{ marginLeft: '0.5rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button type="button" onClick={handleAddTag} className="btn btn-secondary">
                Add Tag
              </button>
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="metadata.priority">Priority</label>
              <select
                id="metadata.priority"
                name="metadata.priority"
                value={formData.metadata.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="metadata.isPublic"
                  checked={formData.metadata.isPublic}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem' }}
                />
                Make this resource public
              </label>
              <small style={{ display: 'block', color: '#666', marginTop: '0.25rem' }}>
                Public resources can be viewed by all users
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading 
                ? (isEditing ? 'Updating...' : 'Creating...') 
                : (isEditing ? 'Update Resource' : 'Create Resource')
              }
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/resources')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceForm;
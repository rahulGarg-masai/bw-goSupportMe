import { useState } from 'react';
import { useUserContext } from '../context/UserContext';

export const Settings = () => {
  const { user, updateUser } = useUserContext();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setSuccessMessage('Profile updated successfully!');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>Settings</h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '1.5rem'
      }}>
        <h2>Update Profile Information</h2>
        
        {successMessage && (
          <div style={{ 
            backgroundColor: '#4caf50', 
            color: 'white', 
            padding: '0.75rem', 
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="name" 
              style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold' 
              }}
            >
              Name
            </label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '4px', 
                border: '1px solid #ccc'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="email" 
              style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold' 
              }}
            >
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '4px', 
                border: '1px solid #ccc'
              }}
              required
            />
          </div>
          
          <button 
            type="submit"
            style={{ 
              backgroundColor: '#6200ea', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

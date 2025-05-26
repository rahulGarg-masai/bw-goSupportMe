import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/weather/${city}`);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '2rem' 
    }}>
      <h1>Weather Dashboard</h1>
      <div style={{ 
        maxWidth: '600px', 
        width: '100%', 
        padding: '2rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f8f9fa'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Search for a City</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              borderRadius: '4px', 
              border: '1px solid #ced4da'
            }}
          />
          <button 
            type="submit"
            style={{ 
              padding: '0.75rem 1rem', 
              backgroundColor: '#0077b6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </form>
      </div>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <p>Enter a city name to see current weather conditions</p>
      </div>
    </div>
  );
};

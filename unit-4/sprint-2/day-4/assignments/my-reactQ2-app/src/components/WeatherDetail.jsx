import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const WeatherDetail = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = '1c9c01977cb8c9c0c0763a5f4f1a89e5';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [city]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading weather data for {city}...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Error: {error}</h2>
        <p>Please try another city</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ 
        maxWidth: '600px', 
        width: '100%', 
        padding: '2rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f8f9fa'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Weather in {weatherData.name}, {weatherData.sys.country}
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={weatherData.weather[0].description}
            style={{ width: '80px', height: '80px' }}
          />
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            {Math.round(weatherData.main.temp)}°C
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ padding: '0.5rem' }}>
            <div style={{ fontWeight: 'bold' }}>Weather</div>
            <div>{weatherData.weather[0].main} - {weatherData.weather[0].description}</div>
          </div>
          <div style={{ padding: '0.5rem' }}>
            <div style={{ fontWeight: 'bold' }}>Feels Like</div>
            <div>{Math.round(weatherData.main.feels_like)}°C</div>
          </div>
          <div style={{ padding: '0.5rem' }}>
            <div style={{ fontWeight: 'bold' }}>Humidity</div>
            <div>{weatherData.main.humidity}%</div>
          </div>
          <div style={{ padding: '0.5rem' }}>
            <div style={{ fontWeight: 'bold' }}>Wind</div>
            <div>{weatherData.wind.speed} m/s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

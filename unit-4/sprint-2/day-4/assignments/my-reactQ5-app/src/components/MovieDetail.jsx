import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKey = '94a04bc9'; // OMDb API key
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${apiKey}`);
        const data = await response.json();
        
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '4px',
          marginBottom: '1rem',
          display: 'inline-block'
        }}>
          <p>{error}</p>
        </div>
        <div>
          <Link 
            to="/"
            style={{ 
              color: '#032541', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <Link 
        to="/"
        style={{ 
          display: 'inline-block', 
          marginBottom: '1.5rem',
          color: '#032541',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        ← Back to Search
      </Link>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr', 
        gap: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.Title}
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '8px'
            }}
          />
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <h1 style={{ marginTop: 0 }}>{movie.Title} <span style={{ color: '#666' }}>({movie.Year})</span></h1>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <span>{movie.Rated}</span>
            <span>•</span>
            <span>{movie.Runtime}</span>
            <span>•</span>
            <span>{movie.Released}</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            {movie.Genre.split(', ').map((genre, index) => (
              <span 
                key={index}
                style={{ 
                  backgroundColor: '#f0f0f0', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '16px',
                  fontSize: '0.875rem'
                }}
              >
                {genre}
              </span>
            ))}
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>Plot</h3>
            <p style={{ lineHeight: '1.6' }}>{movie.Plot}</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h3>Director</h3>
              <p>{movie.Director}</p>
            </div>
            
            <div>
              <h3>Writer</h3>
              <p>{movie.Writer}</p>
            </div>
            
            <div>
              <h3>Actors</h3>
              <p>{movie.Actors}</p>
            </div>
            
            <div>
              <h3>IMDb Rating</h3>
              <p>
                <span style={{ color: '#f5c518', fontWeight: 'bold' }}>★</span> {movie.imdbRating}/10
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async (e) => {
    e.preventDefault();
    
    if (!searchTerm) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = '94a04bc9'; // OMDb API key
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem' 
      }}>
        <h1>Search for Movies</h1>
        <form onSubmit={searchMovies} style={{ 
          display: 'flex', 
          maxWidth: '600px', 
          margin: '0 auto',
          gap: '0.5rem'
        }}>
          <input
            type="text"
            placeholder="Enter movie title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <button 
            type="submit"
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#032541', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Search
          </button>
        </form>
      </div>
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading movies...</p>
        </div>
      )}
      
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '1rem', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && movies.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Search Results</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {movies.map(movie => (
              <Link 
                key={movie.imdbID} 
                to={`/movie/${movie.imdbID}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ position: 'relative', paddingBottom: '150%' }}>
                    <img 
                      src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                      alt={movie.Title}
                      style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ padding: '1rem', flexGrow: 1 }}>
                    <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{movie.Title}</h3>
                    <p style={{ margin: 0, color: '#666' }}>{movie.Year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import { useSelector } from 'react-redux';
import { useState } from 'react';
import MatchCard from './MatchCard';

const FavoritesList = () => {
  const favorites = useSelector(state => state.favoriteData.favorites);
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header" onClick={toggleAccordion}>
        <h3 className="form-title" style={{ margin: 0 }}>
          Favorite Matches ({favorites.length})
        </h3>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="favorites-content">
          <hr style={{ margin: '0.75rem 0' }} />
          
          {favorites.length === 0 ? (
            <div className="empty-message">
              No favorite matches yet. Click the heart icon on matches to add them here.
            </div>
          ) : (
            <div className="card-grid">
              {favorites.map((match, index) => (
                <MatchCard key={`fav-${match.team1}-${match.team2}-${match.year}-${index}`} match={match} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;

import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions/matchActions';

const MatchCard = ({ match }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favoriteData.favorites);
  
  const isMatchFavorite = favorites.some(
    fav => fav.team1 === match.team1 && fav.team2 === match.team2 && fav.year === match.year
  );

  const handleToggleFavorite = () => {
    if (isMatchFavorite) {
      dispatch(removeFavorite(match));
    } else {
      dispatch(addFavorite(match));
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="match-teams">
            <span className="team-name">{match.team1}</span>
            <span className="vs">vs</span>
            <span className="team-name">{match.team2}</span>
          </div>
          
          <div>
            <span className="badge badge-green">
              {match.team1goals} - {match.team2goals}
            </span>
            <span className="badge badge-purple">
              Year: {match.year}
            </span>
          </div>
          
          {match.competition && (
            <div className="match-info">
              Competition: {match.competition}
            </div>
          )}
        </div>
        
        <button 
          className="fav-button"
          aria-label={isMatchFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={handleToggleFavorite}
        >
          {isMatchFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;

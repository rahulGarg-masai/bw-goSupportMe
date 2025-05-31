import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../redux/actions/matchActions';
import MatchCard from './MatchCard';

const MatchList = () => {
  const dispatch = useDispatch();
  const { matches, loading, error } = useSelector(state => state.matchData);
  const { team, year, status } = useSelector(state => state.filterData);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const filteredMatches = matches.filter(match => {
    // Filter by team name
    if (team && !(match.team1.toLowerCase().includes(team.toLowerCase()) || 
                match.team2.toLowerCase().includes(team.toLowerCase()))) {
      return false;
    }

    // Filter by year
    if (year && match.year !== year) {
      return false;
    }

    // Filter by match status (home/away)
    if (status === 'home' && !match.team1.toLowerCase().includes(team.toLowerCase())) {
      return false;
    }
    if (status === 'away' && !match.team2.toLowerCase().includes(team.toLowerCase())) {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="loading-spinner">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <span className="error-icon">⚠️</span>
        Error loading matches: {error}
      </div>
    );
  }

  return (
    <div className="matches-container" style={{ marginTop: '1.5rem' }}>
      <h2 className="form-title">
        {filteredMatches.length > 0 
          ? `Matches (${filteredMatches.length})` 
          : 'No matches found'}
      </h2>
      
      {filteredMatches.length === 0 && !loading ? (
        <div className="empty-message">
          <p style={{ marginBottom: '1rem' }}>No matches found with the current filters.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => dispatch(fetchMatches())}
          >
            Refresh Data
          </button>
        </div>
      ) : (
        <div className="card-grid">
          {filteredMatches.map((match, index) => (
            <MatchCard key={`${match.team1}-${match.team2}-${match.year}-${index}`} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchList;

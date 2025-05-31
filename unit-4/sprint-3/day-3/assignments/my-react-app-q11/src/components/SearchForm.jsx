import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/actions/matchActions';

const SearchForm = () => {
  const dispatch = useDispatch();
  const filterData = useSelector(state => state.filterData);
  
  const [searchParams, setSearchParams] = useState({
    team: filterData.team || '',
    year: filterData.year || '',
    status: filterData.status || 'all'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilter(searchParams));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Search Football Matches</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="team">Team Name</label>
          <input
            id="team"
            name="team"
            type="text"
            placeholder="Enter team name"
            value={searchParams.team}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            name="year"
            type="text"
            placeholder="Enter year (e.g., 2011)"
            value={searchParams.year}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Match Status</label>
          <select
            id="status"
            name="status"
            value={searchParams.status}
            onChange={handleInputChange}
          >
            <option value="all">All Matches</option>
            <option value="home">Home Matches</option>
            <option value="away">Away Matches</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

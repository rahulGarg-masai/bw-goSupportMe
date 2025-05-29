import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';

const initialState = {
  countries: [],
  filteredCountries: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 0,
  searchQuery: '',
  paginationType: 'paginated' // 'paginated' or 'infinite'
};

function countriesReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        countries: action.payload.data,
        filteredCountries: action.payload.data,
        totalPages: Math.ceil(action.payload.data.length / state.limit),
        error: null
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SEARCH':
      const filtered = state.countries.filter(country => 
        country.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        searchQuery: action.payload,
        filteredCountries: filtered,
        totalPages: Math.ceil(filtered.length / state.limit),
        page: 1
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        page: action.payload
      };
    case 'TOGGLE_PAGINATION_TYPE':
      return {
        ...state,
        paginationType: state.paginationType === 'paginated' ? 'infinite' : 'paginated'
      };
    default:
      return state;
  }
}

function CountrySearch() {
  const [state, dispatch] = useReducer(countriesReducer, initialState);
  const { darkMode } = useTheme();
  
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    dispatch({ type: 'FETCH_START' });
    
    try {
      const response = await axios.get('https://api.first.org/data/v1/countries');
      
      // Transform the response data to a more usable format
      const countries = Object.entries(response.data.data).map(([code, country]) => ({
        code,
        name: country.country,
        region: country.region
      }));
      
      dispatch({ 
        type: 'FETCH_SUCCESS', 
        payload: { data: countries } 
      });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_ERROR', 
        payload: error.message 
      });
    }
  };

  const handleSearch = (e) => {
    dispatch({ type: 'SEARCH', payload: e.target.value });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= state.totalPages) {
      dispatch({ type: 'CHANGE_PAGE', payload: newPage });
    }
  };

  const togglePaginationType = () => {
    dispatch({ type: 'TOGGLE_PAGINATION_TYPE' });
  };

  // Get current countries for pagination
  const indexOfLastCountry = state.page * state.limit;
  const indexOfFirstCountry = indexOfLastCountry - state.limit;
  const currentCountries = state.filteredCountries.slice(0, 
    state.paginationType === 'paginated' ? indexOfLastCountry : state.page * state.limit
  );

  return (
    <div className={`country-search-container ${darkMode ? 'dark' : 'light'}`}>
      <h2>Country Search</h2>
      
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search for a country..."
          value={state.searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        
        <div className="pagination-toggle">
          <label>
            <input
              type="checkbox"
              checked={state.paginationType === 'infinite'}
              onChange={togglePaginationType}
            />
            Infinite Scrolling
          </label>
        </div>
      </div>
      
      {state.loading && <div className="loading">Loading countries...</div>}
      
      {state.error && (
        <div className="error-message">
          Error: {state.error}
          <button onClick={fetchCountries} className="retry-button">
            Retry
          </button>
        </div>
      )}
      
      {!state.loading && !state.error && state.filteredCountries.length === 0 && (
        <div className="no-results">No countries found matching your search.</div>
      )}
      
      <div className="countries-grid">
        {currentCountries.map(country => (
          <div key={country.code} className="country-card">
            <h3>{country.name}</h3>
            <p><strong>Code:</strong> {country.code}</p>
            <p><strong>Region:</strong> {country.region || 'N/A'}</p>
          </div>
        ))}
      </div>
      
      {state.paginationType === 'paginated' && state.filteredCountries.length > 0 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(state.page - 1)}
            disabled={state.page === 1}
            className="pagination-button"
          >
            Previous
          </button>
          
          <span className="page-info">
            Page {state.page} of {state.totalPages}
          </span>
          
          <button 
            onClick={() => handlePageChange(state.page + 1)}
            disabled={state.page === state.totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
      
      {state.paginationType === 'infinite' && state.page < state.totalPages && (
        <button 
          onClick={() => handlePageChange(state.page + 1)}
          className="load-more-button"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default CountrySearch;

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/Layout/Layout';

// Home Component
import HomePage from './components/Home/HomePage';

// Movie Components
import MovieList from './components/Movies/MovieList';
import MovieDetail from './components/Movies/MovieDetail';
import SearchForm from './components/Movies/SearchForm';

// Auth Components
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

// Watchlist Components
import WatchlistView from './components/Watchlist/WatchlistView';

// Booking Components
import BookingPage from './components/Booking/BookingPage';
import BookingsHistory from './components/Booking/BookingsHistory';

// Redux Actions
import { fetchPopularMovies } from './redux/actions/movieActions';
import { fetchWatchlist } from './redux/actions/watchlistActions';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  
  if (loading) return null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    // Fetch popular movies on app load
    dispatch(fetchPopularMovies());
    
    // Fetch watchlist if user is authenticated
    if (isAuthenticated) {
      dispatch(fetchWatchlist());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={
            <>
              <SearchForm />
              <MovieList />
            </>
          } />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Protected Routes */}
          <Route path="/watchlist" element={
            <ProtectedRoute>
              <WatchlistView />
            </ProtectedRoute>
          } />
          <Route path="/booking/:id" element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } />
          <Route path="/bookings" element={
            <ProtectedRoute>
              <BookingsHistory />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

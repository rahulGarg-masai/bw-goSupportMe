import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2563eb',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  };

  const buttonStyle = {
    ...linkStyle,
    backgroundColor: 'transparent',
    border: '1px solid white',
    cursor: 'pointer'
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle} onClick={() => navigate('/dashboard')}>
        StudyWell Tracker
      </div>
      {currentUser && (
        <div style={navLinksStyle}>
          <span onClick={() => navigate('/dashboard')} style={linkStyle}>
            Dashboard
          </span>
          <span onClick={() => navigate('/tracker')} style={linkStyle}>
            Daily Tracker
          </span>
          <span onClick={() => navigate('/insights')} style={linkStyle}>
            Insights
          </span>
          <span onClick={() => navigate('/mentor')} style={linkStyle}>
            Mentor
          </span>
          <span>{currentUser.email}</span>
          <button style={buttonStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

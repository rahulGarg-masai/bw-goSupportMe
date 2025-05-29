import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

function Dashboard() {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    document.title = 'Dashboard | React App';
  }, []);

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
      <h2>Welcome to the Dashboard</h2>
      
      <div className="dashboard-content">
        <div className="user-profile">
          <h3>User Profile</h3>
          <div className="profile-info">
            <p><strong>Name:</strong> {user?.name || 'User'}</p>
            <p><strong>Email:</strong> {user?.email || 'No email provided'}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <Link to="/countries" className="action-button">
              <span className="icon">🌎</span>
              <span className="label">Search Countries</span>
            </Link>
          </div>
        </div>

        <div className="dashboard-info">
          <h3>Application Features</h3>
          <ul className="feature-list">
            <li>Authentication with form validation</li>
            <li>Private routes for authenticated users</li>
            <li>Complex state management with useReducer</li>
            <li>Integration with external Country API</li>
            <li>Dark and light mode theme support</li>
            <li>Responsive design with clean UI</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

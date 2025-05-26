import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export const Navbar = () => {
  const { user } = useUserContext();

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem', 
      backgroundColor: '#6200ea', 
      color: 'white' 
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>User Profile App</div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
        <Link to="/settings" style={{ color: 'white', textDecoration: 'none' }}>Settings</Link>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginLeft: '1rem',
          gap: '0.5rem'
        }}>
          <img 
            src={user.avatar} 
            alt={user.name}
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <span>{user.name}</span>
        </div>
      </div>
    </nav>
  );
};

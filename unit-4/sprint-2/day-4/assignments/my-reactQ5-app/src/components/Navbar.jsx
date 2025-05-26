import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      backgroundColor: '#032541', 
      color: 'white' 
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Movie Search App</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      </div>
    </nav>
  );
};

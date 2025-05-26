import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      backgroundColor: '#3f51b5', 
      color: 'white' 
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Product Store</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      </div>
    </nav>
  );
};

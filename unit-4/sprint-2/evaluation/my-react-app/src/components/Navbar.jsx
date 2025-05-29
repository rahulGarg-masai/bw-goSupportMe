import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav className='Navbar'>
            <div className='logo'>SnackShelf</div>
            <div className='nav-links'>
                <Link to="/" className='nav-link'>Home</Link>
                <Link to="/analytics" className='nav-link'>Analytics</Link>
            </div>
        </nav>
    );
}

export default Navbar;
import React from 'react';
import './css/Navbar.css'; // Assuming the CSS is in a css folder
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon


const Navbar: React.FC = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <h1>PayWise</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/payments">Payments</Link></li>
        </ul>
      </nav>

      {/* Person Icon outside of the navbar */}
      <Link to="/login" className="login-icon">
        <FontAwesomeIcon icon={faUser} />
      </Link>
    </div>
  );
};

export default Navbar;

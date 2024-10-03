import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>My App</h1>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
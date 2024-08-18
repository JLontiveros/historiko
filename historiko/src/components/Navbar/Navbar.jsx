import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav>
        <img src={logo} className="img" alt="Logo" />
      <ul>
        <li onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <Link to="/Home">Home</Link>
          {showDropdown && (
            <ul className="dropdown">
              <li><Link to="/Modules">Modules</Link></li>
              <li><Link to="/Topic-marking">Topic Marking</Link></li>
              <li><Link to="/Mini-games">Mini Games</Link></li>
              <li><Link to="/Auth">Sign In / Sign Up</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/Profile">Profile</Link></li>
        <li><Link to="/About">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav>
        <img src={logo} className="img" alt="Logo" />
      <ul>
        <li onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <Link to="/">Home</Link>
          {showDropdown && (
            <ul className="dropdown">
              <li><Link to="/modules">Modules</Link></li>
              <li><Link to="/topic-marking">Topic Marking</Link></li>
              <li><Link to="/mini-games">Mini Games</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
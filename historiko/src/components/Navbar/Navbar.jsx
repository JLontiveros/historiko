import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Assume '/Home' is your starting page
  const isStartingPage = location.pathname === '/Home';

  return (
    <nav>
      <div className="nav-left">
        {!isStartingPage && (
          <FaArrowLeft className="back-icon" onClick={handleGoBack} />
        )}
        <img src={logo} className="img" alt="Logo" />
      </div>
      <ul>
        <li onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <Link to="/Home">Home</Link>
          {showDropdown && (
            <ul className="dropdown">
              <li><Link to="/Modules">Modules</Link></li>
              <li><Link to="/Topicmarking">Topic Marking</Link></li>
              <li><Link to="/Minigames">Mini Games</Link></li>
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
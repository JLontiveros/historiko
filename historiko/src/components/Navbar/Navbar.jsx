import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const isStartingPage = location.pathname === '/Home';

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav>
      <div className="nav-left">
        {!isStartingPage && (
          <FaArrowLeft className="back-icon" onClick={handleGoBack} />
        )}
        <img src={logo} className="img" alt="Logo" />
      </div>
      {isMobile ? (
        <>
          <div className="burger-icon" onClick={toggleMobileMenu}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </div>
          {showMobileMenu && (
            <ul className="mobile-menu">
              <li>
                <Link to="/Home" onClick={toggleMobileMenu}>Home</Link>
                <ul className="mobile-submenu">
                  <li><Link to="/Modules" onClick={toggleMobileMenu}>Modules</Link></li>
                  <li><Link to="/Topicmarking" onClick={toggleMobileMenu}>Topic Marking</Link></li>
                  <li><Link to="/Minigames" onClick={toggleMobileMenu}>Mini Games</Link></li>
                </ul>
              </li>
              <li><Link to="/Profile" onClick={toggleMobileMenu}>Profile</Link></li>
              <li><Link to="/About" onClick={toggleMobileMenu}>About</Link></li>
            </ul>
          )}
        </>
      ) : (
        <ul className="desktop-menu">
          <li onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <Link to="/Home">Home</Link>
            {showDropdown && (
              <ul className="dropdown">
                <li><Link to="/Modules">Modules</Link></li>
                <li><Link to="/Topicmarking">Topic Marking</Link></li>
                <li><Link to="/Minigames">Mini Games</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/Profile">Profile</Link></li>
          <li><Link to="/About">About</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
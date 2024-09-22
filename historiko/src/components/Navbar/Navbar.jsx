import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes, FaBookOpen, FaBookmark, FaInfoCircle } from 'react-icons/fa';
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
                  <Link to="/Modules" onClick={toggleMobileMenu}><FaBookOpen />Modules</Link>
                  <Link to="/Topicmarking" onClick={toggleMobileMenu}><FaBookmark />Topic Marking</Link>
                  <Link to="/Quiz" onClick={toggleMobileMenu}><FaInfoCircle  />Quiz</Link>
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
                <Link to="/Modules"><FaBookOpen />Modules</Link>
                <Link to="/Topicmarking"><FaBookmark />Topic Marking</Link>
                <Link to="/Quiz"><FaInfoCircle  />Quiz</Link>
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
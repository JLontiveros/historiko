import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes, FaBookOpen, FaBookmark, FaInfoCircle } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSubmenu, setShowMobileSubmenu] = useState(false); // New state for mobile submenu visibility
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
    setShowMobileSubmenu(false); // Close submenu when closing main mobile menu
  };

  const toggleNavbar = () => {
    setShowMobileSubmenu(!showMobileSubmenu); // Toggle the submenu visibility
    localStorage.setItem('hasLoggedIn', 'true');
  };

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">
          <img src={logo} className="img" alt="Logo" /> {/* Wrap logo in Link */}
        </Link>
      </div>
      {isMobile ? (
        <>
          <div className="burger-icon" onClick={toggleMobileMenu}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </div>
          {showMobileMenu && (
            <ul className="mobile-menu">
              <li>
                <span onClick={toggleNavbar}>Home</span> {/* Make Home clickable to toggle submenu */}
                {showMobileSubmenu && (
                  <ul className="mobile-submenu">
                    <li><Link to="/Modules" onClick={toggleMobileMenu}><FaBookOpen /> Modules</Link></li>
                    <li><Link to="/Topicmarking" onClick={toggleMobileMenu}><FaBookmark /> Topic Marking</Link></li>
                    <li><Link to="/Quiz" onClick={toggleMobileMenu}><FaInfoCircle /> Quiz</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/Profile" onClick={toggleMobileMenu}>Profile</Link></li>
              <li><Link to="/About" onClick={toggleMobileMenu}>Patungkol</Link></li>
            </ul>
          )}
        </>
      ) : (
        <ul className="desktop-menu">
          <li onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <li><Link to="/Home">Home</Link></li>
            {showDropdown && (
              <ul className="dropdown">
                <li><Link to="/Modules"><FaBookOpen /> Modules</Link></li>
                <li><Link to="/Topicmarking"><FaBookmark /> Topic Marking</Link></li>
                <li><Link to="/Quiz"><FaInfoCircle /> Quiz</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/Profile" onClick={toggleNavbar}>Profile</Link></li>
          <li><Link to="/About" onClick={toggleNavbar}>Patungkol</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

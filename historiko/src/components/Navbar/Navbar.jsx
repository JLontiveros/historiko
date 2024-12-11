import React, { useState, useEffect } from 'react';
import ChatBox from '../Chat/ChatBot';
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
  const user_type = localStorage.getItem('usertype');
  console.log(user_type);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowMobileSubmenu(false); // Close submenu when closing main mobile menu
  };

  const toggleMobileSubmenu = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setShowMobileSubmenu(!showMobileSubmenu); // Toggle submenu visibility
  };

   if(user_type === "Student") {
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
                <Link to="/Home" onClick={toggleMobileMenu}>
                  Home
                </Link>
                <span onClick={toggleMobileSubmenu} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                  {/* Toggle submenu */}
                  {showMobileSubmenu ? '▲' : '▼'}
                </span>
                {showMobileSubmenu && (
                  <ul className="mobile-submenu">
                    <li>
                      <Link to="/Modules" onClick={toggleMobileMenu}>
                        <FaBookOpen /> Modules
                      </Link>
                    </li>
                    <li>
                      <Link to="/Topicmarking" onClick={toggleMobileMenu}>
                        <FaBookmark /> Topic Marking
                      </Link>
                    </li>
                    <li>
                      <Link to="/Quiz" onClick={toggleMobileMenu}>
                        <FaInfoCircle /> Quiz
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/Profile" onClick={toggleMobileMenu}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/About" onClick={toggleMobileMenu}>
                  Patungkol
                </Link>
              </li>
            </ul>
          )}
        </>
      ) : (
       
        <ul className="desktop-menu">
          <li onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            {showDropdown && (
              <ul className="dropdown">
                <li>
                  <Link to="/Modules">
                    <FaBookOpen /> Modules
                  </Link>
                </li>
                <li>
                  <Link to="/Topicmarking">
                    <FaBookmark /> Topic Marking
                  </Link>
                </li>
                <li>
                  <Link to="/Quiz">
                    <FaInfoCircle /> Quiz
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <Link to="/About">Patungkol</Link>
          </li>
        </ul>
      )}
    </nav>
  );
   }
  

else if(user_type === "Teacher") {
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
                <Link to="/Home" onClick={toggleMobileMenu}>
                  Home
                </Link>
                <span onClick={toggleMobileSubmenu} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                  {/* Toggle submenu */}
                  {showMobileSubmenu ? '▲' : '▼'}
                </span>
                {showMobileSubmenu && (
                  <ul className="mobile-submenu">
                    <li>
                      <Link to="/Modules" onClick={toggleMobileMenu}>
                        <FaBookOpen /> Modules
                      </Link>
                    </li>
                    <li>
                      <Link to="/Topicmarking" onClick={toggleMobileMenu}>
                        <FaBookmark /> Topic Marking
                      </Link>
                    </li>
                    <li>
                      <Link to="/Quiz" onClick={toggleMobileMenu}>
                        <FaInfoCircle /> Quiz
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/Profile" onClick={toggleMobileMenu}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/About" onClick={toggleMobileMenu}>
                  Patungkol
                </Link>
              </li>
            </ul>
          )}
        </>
      ) : (
       
        <ul className="desktop-menu">
          <li onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            {showDropdown && (
              <ul className="dropdown">
              <li>
                <Link to="/Modules">
                  <FaBookOpen /> Modules
                </Link>
              </li>
                <li>
                  <Link to="/StudentDashboard">
                    <FaBookOpen /> Student Scores
                  </Link>
                </li>
                <li>
                  <Link to="/Quiz">
                    <FaInfoCircle /> Quiz
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <Link to="/About">Patungkol</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
}

export default Navbar;

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Unatalakayin.css';
import Navbar from '../Navbar/Navbar';
import balangiga from '../../assets/balangiga.png';
import plaquetteImage from '../../assets/firstshot.png';
import tirad from '../../assets/tirad.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Unatalakayin() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showToast && location.state?.fromModules) {
      toast.info("Welcome to Unatalakayin!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem('hasShownUnatalakyinToast', 'true');
    }
  }, [location]);

  return (
    <div className="unatalakayin">
      <Navbar />
      <ToastContainer />
      <h1>Mga Talakayin</h1>
      <div className="events-container">
        <div className="event">
          <img src={plaquetteImage} alt="firstshot" className="event-icon" />
          <h2>Unang Putok sa panlulukan ng Silencio at Sociego, Sta.Mesa</h2>
          <p>Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga amerikano sa mga Pilipino</p>
            <div className="event-link">
              <Link to="/unangputok" className="link-button" state={{ showToast: true }}>See more</Link>
            </div>
        </div>
        <div className="event">
          <img src={tirad} alt="sword" className="event-icon" />
          <h2>Labanan sa Tirad Pass</h2>
          <p>Nangyari ang isa sa makasaysayang sagupaan ng mga rebolusyonaryong Pilipino, ang Labanan sa Pasong Tirad sa pangunguna ni Heneral Gregorio Del Pilar.</p>
            <div className="event-link">
              <Link to="/tiradpass" className="link-button" state={{ showToast: true }}>See more</Link>
            </div>
        </div>
        <div className="event">
          <img src={balangiga} alt="Bell" className="event-icon" />
          <h2>Balangiga Massacre</h2>
          <p>Pinakatanyag na labanan sa pagitan ng mga amerikano at mga Pilipino ay ang labanan sa balangiga na nangyari sa pamumuno ni Heneral Vicente Lukban sa Isla ng Samar.</p>
            <div className="event-link">
              <Link to="/balangiga" className="link-button" state={{ showToast: true }}>See more</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Unatalakayin;
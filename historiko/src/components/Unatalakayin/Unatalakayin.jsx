import React from 'react';
import { Link } from 'react-router-dom';
import './Unatalakayin.css';
import Navbar from '../Navbar/Navbar';
import bellsImage from '../../assets/bell.png';
import plaquetteImage from '../../assets/firstshot.png';
import swordsImage from '../../assets/sword.png';

function Unatalakayin() {
  return (
    <div className="unatalakayin">
      <Navbar />
      <h1>Mga Talakayin</h1>
      <div className="events-container">
        <div className="event">
          <img src={plaquetteImage} alt="firstshot" className="event-icon" />
          <h2>Unang Putok sa panlulukan ng Silencio at Sociego, Sta.Mesa</h2>
          <p>Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga amerikano sa mga Pilipino</p>
        </div>
        <div className="event">
          <img src={swordsImage} alt="sword" className="event-icon" />
          <h2>Labanan sa Tirad Pass</h2>
          <p>Nangyari ang isa sa makasaysayang sagupaan ng mga rebolusyonaryong Pilipino, ang Labanan sa Pasong Tirad sa pangunguna ni Heneral Gregorio Del Pilar.</p>
        </div>
        <div className="event">
          <img src={bellsImage} alt="Bell" className="event-icon" />
          <h2>Balangiga Massacre</h2>
          <p>Pinakatanyag na labanan sa pagitan ng mga amerikano at mga Pilipino ay ang labanan sa balangiga na nangyari sa pamumuno ni Heneral Vicente Lukban sa Isla ng Samar."</p>
        </div>
      </div>
      <div className="eventbtns2">
        <button><Link to="/unangputok" className="link-button">See more</Link></button>
        <button><Link to="/tiradpass" className="link-button">See more</Link></button>
        <button><Link to="/balangiga" className="link-button">See more</Link></button>
      </div>
    </div>
  );
}

export default Unatalakayin;
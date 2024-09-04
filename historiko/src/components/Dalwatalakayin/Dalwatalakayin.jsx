import React from 'react';
import { Link } from 'react-router-dom';
import './Dalwatalakayin.css';
import Navbar from '../Navbar/Navbar';
import biaknabato from '../../assets/biaknabato.png';
import pugadlawin from '../../assets/pugadlawin.png';
import tejeros2 from '../../assets/tejeros2.png';

function Dalwatalakayin() {
  return (
    <div className="dalwatalakayin">
      <Navbar />
      <h1>Mga Talakayin</h1>
      <div className="events-container">
        <div className="event">
          <img src={pugadlawin} alt="firstshot" className="event-icon" />
          <h2>Sigaw ng Pugad-Lawin</h2>
          <p>Ang mga kasapi ng katastaasan kagalanggalangang katipunan ng mga anak ng Bayan (KKK) o Katipunan ay sabay-sabay pinunit ang kani kanilang sedula bilang tanda ng kanilang pagtutol sa pamamahala ng mga espanyol.</p>
        </div>
        <div className="event">
          <img src={tejeros2} alt="sword" className="event-icon" />
          <h2>Tejeros Convention</h2>
          <p>Ang kumbensiyon sa Tejeros na naganap noong Marso 22, 1897 ay isang pagpupulong sa Casa Hacienda de Tejeros, San Francisco de Malabon sa Cavvite na may layuning pagkasunduin ang dalwang paksiyon sa cavite.</p>
        </div>
        <div className="event">
          <img src={biaknabato} alt="Bell" className="event-icon" />
          <h2>Kasunduan sa Biak-na-Bato</h2>
          <p>Biak na bato lugar na matatagpuan sa Miguel de mayumo, bulacan na nagsisilbing kuta nina Aguinaldo sa panahon ng pakikidigma nila sa mga espanyol</p>
        </div>
      </div>
      <div className="eventbtns2">
        <Link to="/sigaw" className="link-button">See more</Link>
        <Link to="/tejeros" className="link-button">See more</Link>
        <Link to="/bato" className="link-button">See more</Link>
      </div>
    </div>
  );
}

export default Dalwatalakayin;
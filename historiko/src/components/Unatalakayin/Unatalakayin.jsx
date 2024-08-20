// src/components/Unatalakayin/Unatalakayin.jsx
import React from 'react';
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
          <p>Ang "Unang Putok sa panlulukan ng Silencio at Sociego, Sta. Mesa" ay tumutukoy sa isang makasaysayang pangyayari na naganap noong gabi ng Agosto 30, 1896, na nagmarka ng simula ng armadong himagsikan laban sa pamahalaang kolonyal ng Espanya sa Pilipinas.</p>
        </div>
        <div className="event">
          <img src={swordsImage} alt="sword" className="event-icon" />
          <h2>Labanan sa Tirad Pass</h2>
          <p>Ang "Labanan sa Tirad Pass" ay isang makasaysayang kaganapan sa kasaysayan ng Pilipinas na naganap noong Disyembre 2, 1899, sa panahon ng Digmaang Pilipino-Amerikano.</p>
        </div>
        <div className="event">
          <img src={bellsImage} alt="Bell" className="event-icon" />
          <h2>Balangiga Massacre</h2>
          <p>Ang "Balangiga Massacre" ay isang makasaysayang pangyayari na naganap noong Setyembre 28, 1901, sa bayan ng Balangiga, Samar, sa panahon ng Digmaang Pilipino-Amerikano. Ang insidenteng ito ay kilala rin bilang "Balangiga Encounter" sa Pilipinas, habang sa Estados Unidos, ito ay tinatawag na "Balangiga Massacre."</p>
        </div>
      </div>
      <div className="eventbtns2">
        <button>See more</button>
        <button>See more</button>
        <button>See more</button>
      </div>
    </div>
  );
}

export default Unatalakayin;
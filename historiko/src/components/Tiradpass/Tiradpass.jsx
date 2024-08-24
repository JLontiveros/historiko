import React from 'react';
import './Tiradpass.css';
import kidst from '../../assets/kidst.png'
import heart from '../../assets/heart.png'

const Tiradpass = () => {
  return (
    <div className="tiradpass-container"> 
      <div className="tiradpass-container-right">
          <h1 className="tiradpass-title">
            Labanan sa Tirad Pass
          </h1>
        <div className="tiradpass-description">
        <img src={heart} alt='hart button'/>
            <div className="tiradpass-blank">
              &nbsp;
            </div>
          <p>
          Ang Labanan sa Tirad Pass (Espanyol; Castilian: Batalla de Paso Tirad; Tagalog: Labanan sa Pasong Tirad; Ang Iloko: Gubat ti Paso), na kung minsan ay tinatawag na "Philippine Thermopylae ", ay isang labanan sa Digmaang Pilipino Amerikano na nakipaglaban noong Disyembre 2, 1899, sa hilagang Luzon sa Pilipinas, kung saan ang isang 60 tauhan na Pilipinong bantay sa likod na pinamumunuan ni Brigadier General Gregorio del Pilar ay sumuko sa mahigit 500 Amerikano, karamihan ay mula sa 33rd Volunteer Infantry Regiment sa ilalim ni Major Peyton C. March,  habang inaantala ang pagsulong ng mga Amerikano upang matiyak na nakatakas si Pangulong Emilio Aguinaldo at ang kanyang mga tropa. 
          </p>
        </div>
        <button>VIEW MORE</button>
      </div>

      <div className="tiradpass-content">
          <img 
            src={kidst}
            alt="Labanan sa Tirad pass illustration" 
            className="tiradpass-image"
          />
          <h2 className="tiradpass-date">Disyembre 2, 1899</h2>
      </div>

    </div>
  );
};

export default Tiradpass;
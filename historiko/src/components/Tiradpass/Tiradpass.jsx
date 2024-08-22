import React from 'react';
import './Tiradpass.css';

const Tiradpass = () => {
  return (
    <div className="tiradpass-container">
      <h1 className="tiradpass-title">
      Labanan sa Tirad Pass
      </h1>
      
      <div className="tiradpass-content">
        <div className="tiradpass-image-container">
          <img 
            src="/placeholder-image.jpg" 
            alt="Labanan sa Tirad pass illustration" 
            className="tiradpass-image"
          />
        </div>
        
        <div className="tiradpass-description">
          <p>
          Ang Labanan sa Tirad Pass (Espanyol; Castilian: Batalla de Paso Tirad; Tagalog: Labanan sa Pasong Tirad; Ang Iloko: Gubat ti Paso), na kung minsan ay tinatawag na "Philippine Thermopylae ", ay isang labanan sa Digmaang Pilipino Amerikano na nakipaglaban noong Disyembre 2, 1899, sa hilagang Luzon sa Pilipinas, kung saan ang isang 60 tauhan na Pilipinong bantay sa likod na pinamumunuan ni Brigadier General Gregorio del Pilar ay sumuko sa mahigit 500 Amerikano, karamihan ay mula sa 33rd Volunteer Infantry Regiment sa ilalim ni Major Peyton C. March,  habang inaantala ang pagsulong ng mga Amerikano upang matiyak na nakatakas si Pangulong Emilio Aguinaldo at ang kanyang mga tropa. 
          </p>
        </div>
      </div>
      
      <div className="tiradpass-footer">
        <h2 className="tiradpass-date">Disyembre 2, 1899</h2>
        <button className="tiradpass-view-button">VIEW</button>
      </div>
    </div>
  );
};

export default Tiradpass;
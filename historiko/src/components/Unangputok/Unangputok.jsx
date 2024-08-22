import React from 'react';
import './Unangputok.css';

const Unangputok = () => {
  return (
    <div className="unangputok-container">
      <h1 className="unangputok-title">
        Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa
      </h1>
      
      <div className="unangputok-content">
        <div className="unangputok-image-container">
          <img 
            src="/placeholder-image.jpg" 
            alt="Unang Putok illustration" 
            className="unangputok-image"
          />
        </div>
        
        <div className="unangputok-description">
          <p>
          Pebrero 4, 1899 - pinasinayaan ang Unang Republika sa Malolos, Bulacan. - Hindi kinilala ng mga Amerikano at iba pang dayuhang bansa ang pamahalaang ito • Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga Amerikano sa mga Pilipino. Napatunayan ng mga Pilipino na ang tunay na hangarin ng mga Amerikano ay sakupin ang Pilipinas.
          Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga Amerikano sa mga Pilipino. Napatunayan ng mga Pilipino na ang tunay na hangarin ng mga Amerikano ay sakupin ang Pilipinas.
          </p>
        </div>
      </div>
      
      <div className="unangputok-footer">
        <h2 className="unangputok-date">Pebrero 4, 1899</h2>
        <button className="unangputok-view-button">VIEW MORE</button>
      </div>
    </div>
  );
};

export default Unangputok;
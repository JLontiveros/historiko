import React from 'react';
import './Unangputok.css';
import kidst from '../../assets/kidst.png'
import heart from '../../assets/heart.png'

const Unangputok = () => {
  return (
    <>
    <div className="unangputok-container">
      <div className="unangputok-container-left">    
        <img 
          src={kidst}
          alt="Unang Putok illustration" 
          className="unangputok-image"
        />
        <h2 className="unangputok-date">Pebrero 4, 1899</h2>
      </div>

        <div className="unangputok-container-right">
          <h1 className="unangputok-title">
            Unang Putok sa panulukan ng <br /> Silencio at Sociego, Sta.Mesa
          </h1>
          <div className="unangputok-description">
          <img src={heart} alt='hart button'/>
            <div className="unangputok-blank">
              &nbsp;
            </div>
            <p>
            Pebrero 4, 1899 - pinasinayaan ang Unang Republika sa Malolos, Bulacan. - Hindi kinilala ng mga Amerikano at iba pang dayuhang bansa ang pamahalaang ito • Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga Amerikano sa mga Pilipino. Napatunayan ng mga Pilipino na ang tunay na hangarin ng mga Amerikano ay sakupin ang Pilipinas. <br/>
            Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga Amerikano sa mga Pilipino. Napatunayan ng mga Pilipino na ang tunay na hangarin ng mga Amerikano ay sakupin ang Pilipinas.
            </p>
          </div>
          <button className="unangputok-view-button">VIEW MORE</button>
        </div>
    
    </div>
    </>
  );
};

export default Unangputok;
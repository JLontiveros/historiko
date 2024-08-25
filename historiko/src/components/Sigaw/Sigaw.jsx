import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sigaw.css';
import kidst from '../../assets/kidst.png';
import heart from '../../assets/heart.png';

const Sigaw = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/PugadLawin');
  };

  return ( 
    <>
      <div className="sigaw-container">
        <div className="sigaw-container-left">    
          <img 
            src={kidst}
            alt="Unang Putok illustration" 
            className="sigaw-image"
          />
          <h2 className="sigaw-date">Pebrero 4, 1899</h2>
        </div>

        <div className="sigaw-container-right">
          <h1 className="sigaw-title">
            Unang Putok sa panulukan ng <br /> Silencio at Sociego, Sta.Mesa
          </h1>
          <div className="sigaw-description">
            <img src={heart} alt='heart button'/>
            <div className="sigaw-blank">
              &nbsp;
            </div>
            <p>
              Pebrero 4, 1899 - pinasinayaan ang Unang Republika sa Malolos, Bulacan. - Hindi kinilala ng mga Amerikano at iba pang dayuhang bansa ang pamahalaang ito • Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga Amerikano sa mga Pilipino. Napatunayan ng mga Pilipino na ang tunay na hangarin ng mga Amerikano ay sakupin ang Pilipinas. <br/>
              Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga Amerikano sa mga Pilipino. Napatunayan ng mga Pilipino na ang tunay na hangarin ng mga Amerikano ay sakupin ang Pilipinas.
            </p>
          </div>
          <button onClick={handleViewMore}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Sigaw;
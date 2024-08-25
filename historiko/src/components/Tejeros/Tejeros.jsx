import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tejeros.css';
import kidst from '../../assets/kidst.png';
import heart from '../../assets/heart.png';

const Tejeros = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/convention');
  };

  return ( 
    <>
      <div className="tejeros-container">
        <div className="tejeros-container-left">    
          <img 
            src={kidst}
            alt="Unang Putok illustration" 
            className="tejeros-image"
          />
          <h2 className="tejeros-date">Pebrero 4, 1899</h2>
        </div>

        <div className="tejeros-container-right">
          <h1 className="tejeros-title">
            Unang Putok sa panulukan ng <br /> Silencio at Sociego, Sta.Mesa
          </h1>
          <div className="tejeros-description">
            <img src={heart} alt='heart button'/>
            <div className="tejeros-blank">
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

export default Tejeros;
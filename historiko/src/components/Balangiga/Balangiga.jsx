import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Balangiga.css';
import kidst from '../../assets/kidst.png'
import heart from '../../assets/heart.png'

const Balangiga = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/balangiga1');
  };
  

  return (
  <>
    <div className="balangiga-container">
      <div className="balangiga-container-left">
        <img 
          src={kidst} 
          alt="balangiga massacre illustration" 
          className="balangiga-image"
        />
        <h2 className="balangiga-date">Septiyembre 29, 1901</h2>
      </div>
      
      <div className="balangiga-container-right">
        <h1 className="balangiga-title">
          Balangiga Massacre
        </h1>
        <div className="balangiga-description">
        <img src={heart} alt='hart button'/>
            <div className="balangiga-blank">
              &nbsp;
            </div>
          <p>
          Ang Balangiga massacre ay isang insidente noong huling yugto ng Digmaang Pilipino Amerikano kung saan nagsagawa ng sorpresang pag atake ang mga residente ng bayan ng Balangiga sa isla ng Samar sa isang occupying unit ng US 9th Infantry na ikinamatay ng 54.Ang insidente ay kilala rin bilang Balangiga Encounter, Balangiga Incident,o Balangiga Conflict,  Iginiit ng ilang Pilipinong historyador na ang termino ng Balangiga Massacre ay mas angkop na tumutukoy sa Marso sa buong Samar, ang sumunod na aksyon sa isla na nagresulta sa tinatayang 2,000 sibilyang Pilipino ang nasawi at nasunog ang mahigit 200 kabahayan, na para sa kanila ay paghihiganti ng mga sundalong Amerikano.
          </p>
        </div>
        <button className="balangiga-view-button" onClick={handleViewMore}>VIEW MORE</button>
      </div>
    </div>
  </>
  );
};

export default Balangiga;
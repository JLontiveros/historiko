import React from 'react';
import './Balangiga3d.css';
import { useNavigate } from 'react-router-dom';
import arrownav2 from '../../assets/arrownav.png';
import Historikobg from '../../assets/Historikobg.png';

const Balangiga3d = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
    <div className="balangiga3d">
      <div className="balangiga3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack}/>
        <h1>Battle of Balangiga Monument</h1>
      </div>
      <div className="picture3d">
        <img src={Historikobg} className='picture-bg'/>
      </div>
    </div>
    </>
  )
}

export default Balangiga3d
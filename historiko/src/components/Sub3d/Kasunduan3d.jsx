import React from 'react';
import './Kasunduan3d.css';
import { useNavigate } from 'react-router-dom';
import arrownav2 from '../../assets/arrownav.png';
import Historikobg from '../../assets/Historikobg.png';

const Kasunduan3d = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
    <div className="Kasunduan3d">
      <div className="Kasunduan3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack}/>
        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, quis!</h1>
      </div>
      <div className="picture3d">
        <img src={Historikobg} className='picture-bg'/>
      </div>
    </div>
    </>
  )
}

export default Kasunduan3d
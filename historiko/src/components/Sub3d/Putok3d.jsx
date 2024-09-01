import React from 'react';
import './Putok3d.css';
import { useNavigate } from 'react-router-dom';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import Historikobg from '../../assets/Historikobg.png';

const Putok3d = () => {
  const navigate = useNavigate();
  const { saveReward } = useReward();
  const { user } = useAuth();

  const handleGoBack = async () => {
    const rewardId = 1; // Replace with the correct reward ID
    
    if (user) {
      const result = await saveReward(rewardId, user.id);
      
      if (result.success) {
        console.log(result.message);
        navigate(-1);
      } else {
        console.error(result.message);
        // Optionally, add a notification or alert to show the error to the user.
      }
    } else {
      console.error('No user is logged in');
      // Optionally, redirect to login page or show an alert
    }
  };
  
  return (
    <div className="Putok3d">
      <div className="Putok3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack} />
        <h1>Gantimpala para sa pag tatapos ng talaka</h1>
      </div>
      <div className="picture3d">
        <img src={Historikobg} className="picture-bg" alt="Background" />
      </div>
    </div>
  );
};

export default Putok3d;

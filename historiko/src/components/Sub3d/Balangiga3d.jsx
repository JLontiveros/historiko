import React from 'react';
import './Balangiga3d.css';
import { useNavigate } from 'react-router-dom';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import Historikobg from '../../assets/Historikobg.png';

const Balangiga3d = () => {
  const navigate = useNavigate();
  const { saveReward } = useReward();
  const { user } = useAuth();

  const handleGoBack = async () => {
    const rewardId = 3; // Replace with the correct reward ID
    
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
import React from 'react';
import './PugadLawin3d.css';
import { useNavigate } from 'react-router-dom';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import {DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css';
import pugadvid from '../../assets/pugadvid.mp4';

const PugadLawin3d = () => {
  const navigate = useNavigate();
  const { saveReward } = useReward();
  const { user } = useAuth();

  const handleGoBack = async () => {
    const rewardId = 4; // Replace with the correct reward ID
    
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
    <div className="PugadLawin3d">
      <div className="PugadLawin3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack}/>
        <h1>Sigaw ng Pugad Lawin</h1>
      </div>
      <div className="picture3d">
        <div className="video-container">
          <Video autoPlay loop onCanPlayThrough={() => {
            console.log('video play')
          }}>
            <source src={pugadvid} type="video/webm"/>
          </Video>
        </div>
      </div>
    </div>
    </>
  )
}

export default PugadLawin3d
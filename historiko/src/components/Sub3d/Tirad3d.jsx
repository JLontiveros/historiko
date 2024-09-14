import React from 'react';
import './Tirad3d.css';
import { useNavigate } from 'react-router-dom';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import {DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css';
import tiradvid from '../../assets/tiradvid.mp4';

const Tirad3d = () => {
  const navigate = useNavigate();
  const { saveReward } = useReward();
  const { user } = useAuth();

  const handleGoBack = async () => {
    const rewardId = 2; // Replace with the correct reward ID
    
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
    <div className="Tirad3d">
      <div className="Tirad3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack}/>
        <h1>Labanan sa Tirad Pass</h1>
      </div>
      <div className="picture3d">
        <div className="video-container">
          <Video autoPlay loop onCanPlayThrough={()=>{
            console.log('video play')
          }}>
            <source src={tiradvid} type="video/webm"/>
          </Video>
        </div>
      </div>
    </div>
    </>
  )
}

export default Tirad3d
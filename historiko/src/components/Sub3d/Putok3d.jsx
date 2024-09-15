import React, { useEffect, useRef } from 'react';
import './Putok3d.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import Historikobg from '../../assets/Historikobg.png';
import {DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css';
import biaknavid from '../../assets/biaknavid.mp4';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Putok3d = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveReward } = useReward();
  const { user } = useAuth();
  const videoRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.showToast) {
      toast.info("mag patuloy at panoorin ang 3d 'Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa' ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [location]);

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

  const handleVideoEnd = () => {
    toast.success("Congratulations! You've completed watching the 3D video.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  return (
    <div className="Putok3d">
      <ToastContainer />
      <div className="Putok3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack} />
        <h1>Gantimpala para sa pag tatapos ng talaka</h1>
      </div>
    <div className="picture3d">
      <div className="video-container">
        <Video autoPlay loop={false} onEnded={handleVideoEnd} ref={videoRef} onCanPlayThrough={() => {
            console.log('video play')
          }}
        >
          <source src={biaknavid} type="video/webm"/>
        </Video>
      </div>
    </div>
    </div>
  );
};

export default Putok3d;

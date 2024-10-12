import React, { useEffect, useRef } from 'react';
import './Putok3d.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import badge1 from '../../assets/badge1.png';
import {DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css';
import unangvid from '../../assets/unangvid.mp4';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../supabaseClient';

const Putok3d = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveReward } = useReward();
  const { user } = useAuth();
  const videoRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.showToast) {
      const userName = user ? user.name || user.username : 'Kaibigan'; // Use 'name' if available, fallback to 'username', or use 'Kaibigan' if user is not logged in
      toast.info(`Pagbati, ${userName}! Magpatuloy at panoorin ang 3d 'Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa'`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [location, user]);

  const getUserUUID = async (username) => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error fetching user UUID:', error);
      return null;
    }
    return data.id;
  };

  const updateProgress = async () => {
    if (user) {
      const userUUID = await getUserUUID(user.username);
      if (userUUID) {
        const { data, error } = await supabase
          .from('user_progress')
          .upsert(
            { user_id: userUUID, topic_id: 1, progress: 100 }, // Assuming topic_id 1 for "Unang Putok"
            { onConflict: ['user_id', 'topic_id'] }
          );

        if (error) {
          console.error('Error updating progress:', error);
        } else {
          console.log('Progress updated successfully to 100%');
        }
      }
    }
  };

  const handleGoBack = async () => {
    const rewardId = 1; // Replace with the correct reward ID
    
    if (user) {
      await updateProgress(); // Update progress to 100%
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
    toast.success(<div style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={badge1} 
        alt="Badge" 
        style={{ width: '50px', height: '50px', marginRight: '50px' }} 
      />
      <span>Gantimpala para sa pagtatapos ng talakayin ng Unang Putok sa panulukan ng Silencio at Sociego, Sta. Mesa.</span>
    </div>,
     {
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
        <h1>Unang Putok sa panulukan ng Silencio at Sociego</h1>
      </div>
    <div className="picture3d">
      <div className="video-container">
        {/* <Video autoPlay loop={false} onEnded={handleVideoEnd} ref={videoRef} onCanPlayThrough={() => {
            console.log('video play')
          }}
        >
          <source src={unangvid} type="video/webm"/>
        </Video> */}
      </div>
    </div>
    </div>
  );
};

export default Putok3d;

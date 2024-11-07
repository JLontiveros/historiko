import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Convention3d.css';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import badge from '../../assets/badge.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../supabaseClient';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

const Convention3d = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveReward } = useReward();
  const { user } = useAuth();
  const secondSectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRef = ref(storage, 'tejerosvid.mp4');
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
      } catch (error) {
        console.error("Error fetching video:", error);
        toast.error("Error loading video. Please try again later.");
      }
    };

    fetchVideo();

    if (location.state && location.state.showToast) {
      const userName = user ? user.name || user.username : 'Kaibigan';
      toast.info(`Pagbati, ${userName}! Mag patuloy at panoorin ang 3d 'Tejeros Convention'`, {
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
  
  // Disable right-click on the video
  const handleRightClick = (e) => {
    e.preventDefault();
  };

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
            { user_id: userUUID, topic_id: 5, progress: 100 },
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
    const rewardId = 5;
    
    if (user) {
      await updateProgress();
      const result = await saveReward(rewardId, user.id);
      
      if (result.success) {
        console.log(result.message);
        navigate(-1);
      } else {
        console.error(result.message);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  const handleVideoEnd = () => {
    toast.success(<div style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={badge} 
        alt="Badge" 
        style={{ width: '50px', height: '50px', marginRight: '10px' }} 
      />
      <span>Gantimpala para sa pagtatapos ng talakayin ng Tejeros Convention.</span>
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
    <div className="convention3d">
      <ToastContainer/>
      <div className="convention3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack}/>
        <h1>Kumben siyong Tejeros</h1>
      </div>
      <div className="picture3d">
        <div className="video-container">
          {videoUrl && (
            <video 
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              onEnded={handleVideoEnd}
              onContextMenu={handleRightClick} // Disable right-click on the video
              style={{ width: '100%', height: '100%' }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}

export default Convention3d;
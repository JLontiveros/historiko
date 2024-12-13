import React, { useEffect, useRef, useState } from 'react';
import ChatBox from '../Chat/ChatBot';
import './PugadLawin3d.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import badge1 from '../../assets/badge1.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../supabaseClient';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import videoFile from '../../assets/pugadlawin2.mp4';

const PugadLawin3d = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveReward } = useReward();
  const { user } = useAuth();
  const secondSectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Set a default value of 'false' in localStorage if it doesn't exist
    if (localStorage.getItem('pugad3dToastShown') === null) {
      localStorage.setItem('pugad3dToastShown', 'false');
    }
  
    const fetchVideo = async () => {
      try {
        const videoRef = ref(storage, 'pugadvid.mp4');
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
  
        // After fetching the video, update localStorage and show the toast if not previously shown
        if (localStorage.getItem('pugad3dToastShown') === 'false') {
          const userName = user ? user.name || user.username : 'Kaibigan';
          toast.info(
            `Pagbati, ${userName}! Magpatuloy at panoorin ang 3d 'Sigaw ng Pugad Lawin'`, 
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          // Update localStorage to prevent the toast from showing again
          localStorage.setItem('pugad3dToastShown', 'true');
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        toast.error("Error loading video. Please try again later.");
      }
    };
  
    fetchVideo();
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
            { user_id: userUUID, topic_id: 4, progress: 100 },
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
    const rewardId = 4; // Reward ID for Sigaw ng Pugad-Lawin
    
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
  
  const handleViewMore = async (e) => {
    e.preventDefault();
   
    navigate('/pugadlawin3d', { state: { showToast: true } });
  };


  const handleVideoEnd = () => {
    toast.success(<div style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={badge1} 
        alt="Badge" 
        style={{ width: '50px', height: '50px', marginRight: '10px' }} 
      />
      <span>Gantimpala para sa pagtatapos ng talakayin ng Sigaw ng Pugad Lawin.</span>
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
    <div className="PugadLawin3d">
      <ToastContainer/>
      <div className="PugadLawin3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack}/>
        <h1>Sigaw ng Pugad Lawin</h1>
      </div>
      <button onClick={handleViewMore} className='viewputok'>View 1st Video</button>
      <br></br>

      <div className="picture3d">
        <div className="video-container">
          {videoUrl && (
            <video
              src={videoFile}
              controls
              autoPlay
              onEnded={handleVideoEnd}
              onContextMenu={handleRightClick}
              style={{ width: '100%', height: '100%' }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    <ChatBox /> 
</div>
  );       


}

export default PugadLawin3d;
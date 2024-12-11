import React, { useEffect, useRef, useState } from 'react';
import ChatBox from '../Chat/ChatBot';
import './Kasunduan3d.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import badgge from '../../assets/badgge.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../supabaseClient';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import videoFile from '../../assets/kasunduan.mp4';

const Kasunduan3d = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveReward } = useReward();
  const { user } = useAuth();
  const secondSectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Set a default value of 'false' in localStorage if it doesn't exist
    if (localStorage.getItem('kasunduan3dToastShown') === null) {
      localStorage.setItem('kasunduan3dToastShown', 'false');
    }
  
    const fetchVideo = async () => {
      try {
        const videoRef = ref(storage, 'biaknavid.mp4');
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
  
        // After fetching the video, update localStorage and show the toast if not previously shown
        if (localStorage.getItem('kasunduan3dToastShown') === 'false') {
          const userName = user ? user.name || user.username : 'Kaibigan';
          toast.info(
            `Pagbati, ${userName}! Magpatuloy at panoorin ang 3d 'Kasunduan sa Biak-na-Bato'`, 
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
          localStorage.setItem('kasunduan3dToastShown', 'true');
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
            { user_id: userUUID, topic_id: 6, progress: 100 },
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
    const rewardId = 6;
    
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
        src={badgge} 
        alt="Badge" 
        style={{ width: '50px', height: '50px', marginRight: '10px' }} 
      />
      <span>Gantimpala para sa pagtatapos ng talakayin ng Biak na Bato.</span>
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


  const handleViewMore = async (e) => {
    e.preventDefault();
   
    navigate('/kasunduan3d', { state: { showToast: true } });
  };

  return (
    <div className="Kasunduan3d">
      <ToastContainer/>
      <div className="Kasunduan3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack} />
        <h1>Kasunduan sa Biak na Bato</h1>
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

export default Kasunduan3d;
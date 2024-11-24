import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Balangiga.css';
import lukban from '../../assets/lukban.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Balangiga = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic, markedTopics } = useMarkedTopics();
  const topicId = 3; // "Balangiga Massacre"
  const topicName = "Balangiga Massacre";
  const toastKey = "hasShownBalangigaToast";

  let timer;

  useEffect(() => {
    // Set default value in localStorage if not present
    if (!localStorage.getItem(toastKey) === null) {
      localStorage.setItem(toastKey, 'false');
    }

    // Display toast message if not shown yet
    if (user && localStorage.getItem(toastKey) === 'false') {
      timer = setTimeout(() => {
        const userName = user ? user.name || user.username : 'Kaibigan';
        toast.info(`Pagbati, ${userName}! Magpatuloy at alamin ang lahat tungkol sa Balangiga Massacre`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 1500);
    }

    if (user) {
      checkIfMarked();
    } else {
      setIsLoading(false);
    }

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [user, markedTopics]);

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

  const checkIfMarked = () => {
    setIsMarked(markedTopics.some(topic => topic.id === topicId));
    setIsLoading(false);
  };

  const handleHeartClick = async (e) => {
    e.preventDefault(); // Prevent default behavior
    localStorage.setItem(toastKey, 'true');
  
    if (!user) {
      toast.info('You need to be logged in to mark topics.', {
        onClick: () => navigate('/signup')
      });
      return;
    }

    // Clear the timer-based toast if user clicks heart
    clearTimeout(timer);
  
    try {
      if (isMarked) {
        await removeMarkedTopic(topicId);
        toast.success('Matagumpay na inalis ang marka!');
      } else {
        await addMarkedTopic(topicName, topicId);
        toast.success('Matagumpay na minarkahan!');
      }
      setIsMarked(!isMarked);
    } catch (error) {
      console.error('Error toggling mark:', error);
      toast.error('Error updating topic. Please try again.');
    }
    setIsLoading(false);
  };

  const handleViewMore = async () => {
    localStorage.setItem(toastKey, 'true');
    if (user) {
      const userUUID = await getUserUUID(user.username);
      if (userUUID) {
        // First, fetch the current progress
        const { data: currentProgressData, error: fetchError } = await supabase
          .from('user_progress')
          .select('progress')
          .eq('user_id', userUUID)
          .eq('topic_id', topicId)
          .single();

        if (fetchError) {
          console.error('Error fetching current progress:', fetchError);
        } else {
          const currentProgress = currentProgressData ? currentProgressData.progress : 0;

          // Only update if current progress is less than 100
          if (currentProgress < 100) {
            const newProgress = Math.max(currentProgress, 40); // Ensure progress doesn't decrease
            const { data, error } = await supabase
              .from('user_progress')
              .upsert(
                { user_id: userUUID, topic_id: topicId, progress: newProgress },
                { onConflict: ['user_id', 'topic_id'] }
              );

            if (error) {
              console.error('Error updating progress:', error);
            } else {
              console.log(`Progress updated to ${newProgress}%`);
            }
          } else {
            console.log('Progress already at 100%, no update needed');
          }
        }
      }
    }
    navigate('/balangiga1', { state: { showToast: true } });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <ToastContainer/>
      <div className="balangiga-container">
        <div className="balangiga-container-left">
          <img 
            src={lukban} 
            alt="balangiga massacre illustration" 
            className="balangiga-image"
          />
          <h2 className="balangiga-date">Captain Thomas Connell</h2>
        </div>
        
        <div className="balangiga-container-right">
          <h1 className="balangiga-title">
            {topicName}
          </h1>
          <div className="balangiga-description">
            <img 
              src={heart} 
              alt='heart button'
              onClick={handleHeartClick}
              style={{ 
                cursor: 'pointer', 
                filter: isMarked ? 'none' : 'grayscale(100%)',
                transition: 'filter 0.3s ease',
                opacity: user ? 1 : 0.5
              }}
            />
            <div className="balangiga-blank">
              &nbsp;
            </div>
            <p>
            Agosto 11, 1901 Nang makarating sa lugar ang Company C of the 9th Infantry Regiment ng Amerika sa pamumuno ni Captain Thomas Connell sa Balangiga, Samar. Layunin nila na sugpuin ang mga Pilipinong patuloy na nakikipaglaban sa pamumuno ni Vicente Lukban sa pamamagitan ng pagsira sa mga pananim at ari-arian na siyang pinagkukunan ng suplay ng mga gerilya.
            </p>
          </div>
          <button className="balangiga-view-button" onClick={handleViewMore}>Mag-patuloy</button>
        </div>
      </div>
    </>
  );
};

export default Balangiga;
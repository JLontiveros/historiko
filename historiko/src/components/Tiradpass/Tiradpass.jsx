import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tiradpass.css';
import genmcarthur from '../../assets/genmcarthur.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tiradpass = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic, markedTopics } = useMarkedTopics();
  const topicId = 2; // "Labanan sa Tirad Pass"
  const topicName = "Labanan sa Tirad Pass";
  const [userId, setUserId] = useState(null);
  const toastKey = "hasShownTiradpassToast";

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
        toast.info(`Pagbati, ${userName}! Magpatuloy at alamin ang lahat tungkol sa Labanan sa Tirad Pass`, {
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
    localStorage.setItem(toastKey, 'true');
    e.preventDefault();
  
    if (!user) {
      toast.info('You need to be logged in to mark topics.', {
        onClick: () => navigate('/signup')
      });
      return;
    }

    clearTimeout(timer);
  
    try {
      if (isMarked) {
        await removeMarkedTopic(topicId);
        toast.success('Topic unmarked successfully!');
        setIsMarked(false);
      } else {
        await addMarkedTopic(topicName, topicId, userId);
        toast.success('Topic marked successfully!');
        setIsMarked(true);
      }
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
    navigate('/tirad', { state: { showToast: true } });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <ToastContainer />

    <div className="tiradpass-container"> 
    <div className="tiradpass-container-left">
        <img 
          src={genmcarthur}
          alt="Labanan sa Tirad pass illustration" 
          className="tiradpass-image"
        />
        <h2 className="tiradpass-date">General Arhur McArthur</h2>
      </div>

      <div className="tiradpass-container-right">
        <h1 className="tiradpass-title">
          {topicName}
        </h1>
        <div className="tiradpass-description">
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
          <div className="tiradpass-blank">
            &nbsp;
          </div>
          <p>
          Si General Arthur McArthur ang namuno sa pagsalakay sa Malolos, Bulacan ang himpilan ni Emilio Aguinaldo.  Dahil sa malakas na puwersang military ng amerika, tumakas si Emilio Aguinaldo kasama ang kanyang gabinete, kagawa at sundalo upang maiwasan ang pagtugis ng mga amerikano at sila ay dumaan sa pasong Tirad. 
          </p>
        </div>
        <button onClick={handleViewMore}>Mag-patuloy</button>
      </div>
    </div>
    </>
  );
};

export default Tiradpass;
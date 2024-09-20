import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Balangiga.css';
import capthomas from '../../assets/capthomas.png';
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
  const { addMarkedTopic, removeMarkedTopic } = useMarkedTopics();
  const topicId = 3;
  const topicName = "Balangiga Massacre";

  useEffect(() => {
    if (user) {
      checkIfMarked();
    } else {
      setIsLoading(false);
    }

    const timer = setTimeout(() => {
      toast.info("Magpatuloy at alamin ang lahat tungkol sa Balangiga Massacre", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, 1500);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);

  }, [user]);

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

  const checkIfMarked = async () => {
    setIsLoading(true);
    const userUUID = await getUserUUID(user.username);
    if (!userUUID) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('user_topics')
      .select()
      .eq('user_id', userUUID)
      .eq('topic_id', topicId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking if topic is marked:', error);
    } else {
      setIsMarked(!!data);
    }
    setIsLoading(false);
  };

  const handleHeartClick = async () => {
    if (!user) {
      const confirmed = window.confirm('You need to be logged in to mark topics. Would you like to log in now?');
      if (confirmed) {
        navigate('/signup');
      }
      return;
    }

    setIsLoading(true);
    const userUUID = await getUserUUID(user.username);
    if (!userUUID) {
      setIsLoading(false);
      alert('Error fetching user information. Please try again.');
      return;
    }

    if (isMarked) {
      const { error } = await supabase
        .from('user_topics')
        .delete()
        .match({ user_id: userUUID, topic_id: topicId });

      if (error) console.error('Error removing mark:', error);
      else {
        setIsMarked(false);
        removeMarkedTopic(topicId);
      }
    } else {
      const { error } = await supabase
        .from('user_topics')
        .insert({
          user_id: userUUID,
          topic_id: topicId,
          topic_name: topicName,
          marked_at: new Date().toISOString(),
          status: 'to_review'
        });

      if (error) console.error('Error adding mark:', error);
      else {
        setIsMarked(true);
        addMarkedTopic({ id: topicId, topic_name: topicName });
      }
    }
    setIsLoading(false);
  };

  const handleViewMore = async () => {
    if (user) {
      const userUUID = await getUserUUID(user.username);
      if (userUUID) {
        const { data, error } = await supabase
          .from('user_progress')
          .upsert(
            { user_id: userUUID, topic_id: topicId, progress: 40 },
            { onConflict: ['user_id', 'topic_id'] }
          );

        if (error) {
          console.error('Error updating progress:', error);
        } else {
          console.log('Progress updated successfully');
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
            src={capthomas} 
            alt="balangiga massacre illustration" 
            className="balangiga-image"
          />
          <h2 className="balangiga-date">Capt. Thomas Connell</h2>
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
              Agosto 11, 1901 Nang makarating sa lugar ang Company C of the 9th Infantry Regiment ng Amerika sa pamumuno ni Capt. Thomas Connell sa Balangiga, Samar. Layunin nila na sugpuin ang mga Pilipinong patuloy na nakikipaglaban sa pamumuno ni Vicente Lukban sa pamamagitan ng pagsira sa mga pananim at ari-arian na siyang pinagkukunan ng suplay ng mga gerilya. Setyembre  28, 1901, isinagawa ang planong pagpatay sa buong pangkat ng amerikanong sundalo sa tulong ng mga mamamayan ng Balangiga. Sa 74 na miyembro ng Company C ay 36 ang nasawi kasama si Capt. Thomas Connell, 22 ang sugatan at 4 ang nawala.
            </p>
          </div>
          <button className="balangiga-view-button" onClick={handleViewMore}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Balangiga;
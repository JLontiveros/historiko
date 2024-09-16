import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tiradpass.css';
import genmcarthur from '../../assets/genmcarthur.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';

const Tiradpass = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic, markedTopics } = useMarkedTopics();
  const topicId = 2; // "Labanan sa Tirad Pass"
  const topicName = "Labanan sa Tirad Pass";

  useEffect(() => {
    if (user) {
      checkIfMarked();
    } else {
      setIsLoading(false);
    }
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
    navigate('/tirad');
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
          Si Gen Arthur McArthur ang namuno sa pagsalakay sa Malolos, Bulacan ang himpilan ni Emilio Aguinaldo.  Dahil sa malakas na puwersang military ng amerika, tumakas si Emilio Aguinaldo kasama ang kanyang gabinete, kagawa at sundalo upang maiwasan ang pagtugis ng mga amerikano at sila ay dumaan sa pasong Tirad. 
          </p>
        </div>
        <button onClick={handleViewMore}>VIEW MORE</button>
      </div>
    </div>
    </>
  );
};

export default Tiradpass;
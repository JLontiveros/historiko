import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Unangputok.css';
import privwilliam from '../../assets/privwilliam.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';

const Unangputok = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic } = useMarkedTopics();
  const topicId = 1; // "Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa"
  const topicName = "Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa";

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
    navigate('/putok');
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="unangputok-container">
        <div className="unangputok-container-left">    
          <img 
            src={privwilliam}
            alt="Unang Putok illustration" 
            className="unangputok-image"
          />
          <h2 className="unangputok-date">Private William Walter Grayson</h2>
        </div>

        <div className="unangputok-container-right">
          <h1 className="unangputok-title">
            Unang Putok sa panulukan ng <br /> Silencio at Sociego, Sta.Mesa
          </h1>
          <div className="unangputok-description">
            <img 
              src={heart} 
              alt='heart button'
              onClick={handleHeartClick}
              style={{ 
                cursor: 'pointer', 
                filter: isMarked ? 'none' : 'grayscale(100%)',
                transition: 'filter 0.3s ease',
                opacity: user ? 1 : 0.5 // Dim the heart if user is not logged in
              }}
            />
            <div className="unangputok-blank">
              &nbsp;
            </div>
            <p>
            Pebrero 4, 1899, Sumiklab ang digmaan sa pagitan ng Pilipinas at Amerika nang paputukan ni Pvt. William Walter Grayson ang tatlong Pilipinong Sundalo na naglalakad sa Calle Silencio at Sociego sa Sta. Mesa Manila. “HALT!! “ na ang ibigsabihin ay pahintuin ang mga sundalong Pilipino at ito ang nagging hudyat ng simula ng digmaang Pilipino – amerikano. Ang isa sa apat na Pilipinong sundalo na nabaril at nasawi ay si Corporal Anastacio Felix ng ikaapat na batalyon sa ilalim ng pamumuno ni Captain Serapio Narvaez.
            </p>
          </div>
          <button onClick={handleViewMore}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Unangputok;
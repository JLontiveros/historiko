import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bato.css';
import kidst from '../../assets/kidst.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';

const Bato = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic } = useMarkedTopics();
  const topicId = 5; // Assuming "Kasunduan sa Biak-na-Bato" is the 5th topic
  const topicName = "Kasunduan sa Biak-na-Bato";


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

  const handleViewMore = () => {
    navigate('/kasunduan');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return ( 
    <>
      <div className="bato-container">
        <div className="bato-container-left">    
          <img 
            src={kidst}
            alt="Kasunduan sa Biak-na-Bato illustration" 
            className="bato-image"
          />
          <h2 className="bato-date">Disyembre 14, 1897</h2>
        </div>

        <div className="bato-container-right">
          <h1 className="bato-title">
            {topicName}
          </h1>
          <div className="bato-description">
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
            <div className="bato-blank">
              &nbsp;
            </div>
            <p>
              Ang Kasunduan sa Biak-na-Bato ay isang kasunduan na nilagdaan noong Disyembre 14, 1897, sa pagitan ng mga rebolusyonaryong Pilipino sa pamumuno ni Emilio Aguinaldo at ng mga kinatawan ng pamahalaang Espanyol. Ito ay nagresulta sa pansamantalang paghinto ng labanan at ang boluntaryong pagpapatapon ni Aguinaldo at ng kanyang mga kasamahan sa Hong Kong.
            </p>
          </div>
          <button onClick={handleViewMore}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Bato;
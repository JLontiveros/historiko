import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tejeros.css';
import casa from '../../assets/casa.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';

const Tejeros = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic } = useMarkedTopics();
  const topicId = 3; // "Tejeros Convention"
  const topicName = "Tejeros Convention";

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
    navigate('/convention');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return ( 
    <>
      <div className="tejeros-container">
        <div className="tejeros-container-left">    
          <img 
            src={casa}
            alt="Tejeros Convention illustration" 
            className="tejeros-image"
          />
          <h2 className="tejeros-date">Casa Hacienda De Tejeros</h2>
        </div>

        <div className="tejeros-container-right">
          <h1 className="tejeros-title">
            {topicName}
          </h1>
          <div className="tejeros-description">
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
            <div className="tejeros-blank">
              &nbsp;
            </div>
            <p>
            Nagkaroon muli ng isa pang pagpupulong noong Marso 22, 1897 sa Casa Hacienda De Tejeros sa San Francisco Malabon (CAVITE) na naglalayong pagkasunduin ang dalwang pangkat na dinaluhan ni Andres Bonifacio. <br />Sa pagpupulong na ito ay nagkaroon ng isang halalan, nanalo si Emilio Aguinaldo bilang Pangulo, si Mariano Trias bilang pangalawang pangulo, si Artemio Ricarte bilang Kapitan Heneral, si Emilianio Riego De Dios bilang Kalihim ng Digmaan at si Andres Bonfacio bilang Direktor ng interyor at ang pagkapanalo ni Andres ay mahigpit itong tinutulan ni Daniel Tirona sa kadahilanang hindi ito abogado at walang sapat na kaalaman sa mga batas.
            </p>
          </div>
          <button onClick={handleViewMore}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Tejeros;
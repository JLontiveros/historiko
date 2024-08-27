import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tiradpass.css';
import kidst from '../../assets/kidst.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';

const Tiradpass = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const topicId = 2; // "Labanan sa Tirad Pass"

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
      else setIsMarked(false);
    } else {
      const { error } = await supabase
        .from('user_topics')
        .insert({
          user_id: userUUID,
          topic_id: topicId,
          marked_at: new Date().toISOString(),
          status: 'to_review'
        });

      if (error) console.error('Error adding mark:', error);
      else setIsMarked(true);
    }
    setIsLoading(false);
  };

  const handleViewMore = () => {
    navigate('/tirad');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tiradpass-container"> 
      <div className="tiradpass-container-right">
        <h1 className="tiradpass-title">
          Labanan sa Tirad Pass
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
            Ang Labanan sa Tirad Pass (Espanyol; Castilian: Batalla de Paso Tirad; Tagalog: Labanan sa Pasong Tirad; Ang Iloko: Gubat ti Paso), na kung minsan ay tinatawag na "Philippine Thermopylae ", ay isang labanan sa Digmaang Pilipino Amerikano na nakipaglaban noong Disyembre 2, 1899, sa hilagang Luzon sa Pilipinas, kung saan ang isang 60 tauhan na Pilipinong bantay sa likod na pinamumunuan ni Brigadier General Gregorio del Pilar ay sumuko sa mahigit 500 Amerikano, karamihan ay mula sa 33rd Volunteer Infantry Regiment sa ilalim ni Major Peyton C. March,  habang inaantala ang pagsulong ng mga Amerikano upang matiyak na nakatakas si Pangulong Emilio Aguinaldo at ang kanyang mga tropa. 
          </p>
        </div>
        <button onClick={handleViewMore}>VIEW MORE</button>
      </div>

      <div className="tiradpass-content">
        <img 
          src={kidst}
          alt="Labanan sa Tirad pass illustration" 
          className="tiradpass-image"
        />
        <h2 className="tiradpass-date">Disyembre 2, 1899</h2>
      </div>
    </div>
  );
};

export default Tiradpass;
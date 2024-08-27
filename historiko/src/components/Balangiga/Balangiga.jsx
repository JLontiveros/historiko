import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Balangiga.css';
import kidst from '../../assets/kidst.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';

const Balangiga = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const topicId = 6; // Assuming "Balangiga Massacre" is the 6th topic

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
    navigate('/balangiga1');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="balangiga-container">
        <div className="balangiga-container-left">
          <img 
            src={kidst} 
            alt="balangiga massacre illustration" 
            className="balangiga-image"
          />
          <h2 className="balangiga-date">Septiyembre 29, 1901</h2>
        </div>
        
        <div className="balangiga-container-right">
          <h1 className="balangiga-title">
            Balangiga Massacre
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
              Ang Balangiga massacre ay isang insidente noong huling yugto ng Digmaang Pilipino Amerikano kung saan nagsagawa ng sorpresang pag atake ang mga residente ng bayan ng Balangiga sa isla ng Samar sa isang occupying unit ng US 9th Infantry na ikinamatay ng 54. Ang insidente ay kilala rin bilang Balangiga Encounter, Balangiga Incident, o Balangiga Conflict. Iginiit ng ilang Pilipinong historyador na ang termino ng Balangiga Massacre ay mas angkop na tumutukoy sa Marso sa buong Samar, ang sumunod na aksyon sa isla na nagresulta sa tinatayang 2,000 sibilyang Pilipino ang nasawi at nasunog ang mahigit 200 kabahayan, na para sa kanila ay paghihiganti ng mga sundalong Amerikano.
            </p>
          </div>
          <button className="balangiga-view-button" onClick={handleViewMore}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Balangiga;
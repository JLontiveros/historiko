import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tejeros.css';
import casa from '../../assets/casa.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tejeros = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic, markedTopics } = useMarkedTopics();
  const topicId = 5; // "Tejeros Convention"
  const topicName = "Tejeros Convention";

  let timer;

  useEffect(() => {
    if (user) {
      checkIfMarked();
    } else {
      setIsLoading(false);
    }

    timer = setTimeout(() => {
      const userName = user ? user.name || user.username : 'Kaibigan'; // Use 'name' if available, fallback to 'username', or use 'Kaibigan' if user is not logged in
      toast.info(`Pagbati, ${userName}! Magpatuloy at alamin ang lahat tungkol sa Tejeros Convention`, {
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
        toast.success('Topic unmarked successfully!');
      } else {
        await addMarkedTopic(topicName, topicId);
        toast.success('Topic marked successfully!');
      }
      setIsMarked(!isMarked);
    } catch (error) {
      console.error('Error toggling mark:', error);
      toast.error('Error updating topic. Please try again.');
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
    navigate('/convention', { state: { showToast: true } });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return ( 
    <>
    <ToastContainer/>
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
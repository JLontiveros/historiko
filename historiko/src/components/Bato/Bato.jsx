import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bato.css';
import groupnabiak from '../../assets/groupnabiak.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bato = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic, markedTopics } = useMarkedTopics();
  const topicId = 6; // Assuming "Kasunduan sa Biak-na-Bato" is the 5th topic
  const topicName = "Kasunduan sa Biak-na-Bato";

  let timer;

  useEffect(() => {
    if (user) {
      checkIfMarked();
    } else {
      setIsLoading(false);
    }

    timer = setTimeout(() => {
      const userName = user ? user.name || user.username : 'Kaibigan'; // Use 'name' if available, fallback to 'username', or use 'Kaibigan' if user is not logged in
      toast.info(`Pagbati, ${userName}! Magpatuloy at alamin ang lahat tungkol sa Kasunduan sa Biak na Bato`, {
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
    navigate('/kasunduan', { state: { showToast: true } });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return ( 
    <>
    <ToastContainer/>
      <div className="bato-container">
        <div className="bato-container-left">    
          <img 
            src={groupnabiak}
            alt="Kasunduan sa Biak-na-Bato illustration" 
            className="bato-image"
          />
          <h2 className="bato-date">Lorem ipsum dolor sit amet.</h2>
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
            Pinulong ni Emilio Aguinaldo ang mga pinuno ng hukbo upang bumuo ng Saligang Batas. Noong Nobyembre 1, 1897 ay nabuo ang konstitusyon ng Biak na Bato na isinulat nila Isabelo Artacho, At Feliz Ferrer na inisulat sa Biak na Bato sa bulacan na sinasabing ibinase sa SAligang batas ng bansang Cuba sa Jimaguayú. ANg biak na bato ay nagbigay para sa paglikha ng kataastaasang konseho pati narin ang karapatang pangtao kasama ang kalayaan, relihiyon, at edukasyon. Nagwakas ang katipunan at napalitan ng isang pamahalaan na may konstitusyong sinusunod. Nawala man ang samahang KKK ngunit ang mga kasapi nito ay patuloy pa ring nakipaglaban sa mga Espanyol.
            </p>
          </div>
          <button onClick={handleViewMore}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Bato;
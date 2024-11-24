import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bato.css';
import Picture20 from '../../assets/Picture20.png';
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
  const toastKey = "hasShownBatoToast";

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
        toast.info(`Pagbati, ${userName}! Magpatuloy at alamin ang lahat tungkol sa Kasunduan sa Biak-na-Bato`, {
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
    e.preventDefault(); // Prevent default behavior
    localStorage.setItem(toastKey, 'true');
  
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
            src={Picture20}
            alt="Kasunduan sa Biak-na-Bato illustration" 
            className="bato-image"
          />
          <h2 className="bato-date">Si Aguinaldo at kasamahan nito patungong Hong Kong</h2>
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
            Ilan sa mga probinsyon ng Kasunduan sa Biak-na-Bato:
            <br/>
            1.	Pagtigil ng mga pinunong Rebolusyonaryo sa labanan at maninirahan sila sa Hongkong.<br/>
            2.	Lubusang kapatawaran sa lahat ng Rebolusyonaryo at pagsuko ng kanilang mga sandata.<br/>
            3.	Pagkakaloob sa Espanya ng halagang P1,700,000 bilang kabayaran sa mga Rebolusyonaryo at mga pamilya nito
            <br/>
            Pansamantalang umiral ang kapayapaan dulot ng
            Kasunduan sa Biak na Bato. Nagtungo sa Hong Kong si Emilio Aguinaldo at ang ilang pinuno ng kilusan. Ngunit ipinagpatuloy nya parin ang pamahalaang Rebulusyonaryo. <br/>
            Hindi tinupad ng Espanya ang pangakong pagbabayad sa mga Pilipino at tanging P600,000 lamang ang binayad nito, P400,000 kay Aguinaldo at P200,000 sa mga kawal. Nasa pagtatapos ang mas detalyeng kasunduan.

            </p>
          </div>
          <button onClick={handleViewMore}>Mag-patuloy</button>
        </div>
      </div>
    </>
  );
};

export default Bato;
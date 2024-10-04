import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sigaw.css';
import angkatipunan from '../../assets/angkatipunan.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sigaw = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic, markedTopics } = useMarkedTopics();
  const topicId = 4; // Assuming "Sigaw ng Pugad Lawin" is the 4th topic
  const topicName = "Sigaw ng Pugad Lawin";

  let timer;

  useEffect(() => {
    if (user) {
      checkIfMarked();
    } else {
      setIsLoading(false);
    }

    timer = setTimeout(() => {
      const userName = user ? user.name || user.username : 'Kaibigan'; // Use 'name' if available, fallback to 'username', or use 'Kaibigan' if user is not logged in
      toast.info(`Pagbati, ${userName}! Magpatuloy at alamin ang lahat tungkol sa Sigaw ng Pugad Lawin`, {
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
    navigate('/PugadLawin', { state: { showToast: true } });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return ( 
    <>
    <ToastContainer/>
      <div className="sigaw-container">
        <div className="sigaw-container-left">    
          <img 
            src={angkatipunan}
            alt="Sigaw ng Pugad Lawin illustration" 
            className="sigaw-image"
          />
          <h2 className="sigaw-date">Ang Katipunan</h2>
        </div>

        <div className="sigaw-container-right">
          <h1 className="sigaw-title">
            {topicName}
          </h1>
          <div className="sigaw-description">
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
            <div className="sigaw-blank">
              &nbsp;
            </div>
            <p>
            Itinatatag ni Andres Bonifacio ang isang lihim na samahang KKK, Kataastaasang, Kagalang-galangang Katipunan ng mga Anak ng Bayan o Katipun noong July 7, 1892 sa isang bahay sa 72 Kalye Azcarraga (Claro M. Recto ngayon) kasama sina Valentin Diaz, Teodoro Plata, Ladislao Diwa, Deodato Arellano, at Jose Dizon. Ang kasapi sa samahang ito ay tinawag na Katipunero. Pangunahing Layunin ng samahan na mapagsama-sama ang lahat ng mga Pilipino at makipaglaban sa mga Espanol upang makamit ang kalayaan at ang Layunin ng Katipunan ay ang Politikal, Moral, Sibiko na may tatlong sanggunian ng KKK na Kataastaasang Sangunian, Sangguniang Bayan at Sangguniang Balangay.
            </p>
          </div>
          <button onClick={handleViewMore}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Sigaw;
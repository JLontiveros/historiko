import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Unangputok.css';
import privwilliam from '../../assets/privwilliam.png';
import heart from '../../assets/heart.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Unangputok = () => {
  const navigate = useNavigate();
  const [isMarked, setIsMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addMarkedTopic, removeMarkedTopic, markedTopics } = useMarkedTopics();
  const topicId = 1; // "Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa"
  const topicName = "Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa";

  let timer;

  useEffect(() => {
    if (user) {
      checkIfMarked();
    } else {
      setIsLoading(false);
    }

    timer = setTimeout(() => {
      const userName = user ? user.name || user.username : 'Kaibigan'; // Use 'name' if available, fallback to 'username', or use 'Kaibigan' if user is not logged in
      toast.info(`Pagbati, ${userName}! Magpatuloy at alamin ang lahat tungkol sa Unang Putok sa panulukan ng Silencio at Sociego, Sta. Mesa`, {
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
    e.preventDefault();
  
    if (!user) {
      toast.info('You need to be logged in to mark topics.', {
        onClick: () => navigate('/signup')
      });
      return;
    }

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
    navigate('/putok', { state: { showToast: true } });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />

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
            Pebrero 4, 1899, Sumiklab ang digmaan sa pagitan ng Pilipinas at Amerika nang paputukan ni Pvt. William Walter Grayson ang tatlong Pilipinong Sundalo na naglalakad sa Calle Silencio at Sociego sa Sta. Mesa Manila. “HALT!! “ na ang ibigsabihin ay pahintuin ang mga sundalong Pilipino at ito ang naging hudyat ng simula ng Digmaang Pilipino–Amerikano. Ang isa sa apat na Pilipinong sundalo na nabaril at nasawi ay si Corporal Anastacio Felix ng ika-apat na batalyon sa ilalim ng pamumuno ni Captain Serapio Narvaez.
            </p>
          </div>
          <button className="btnview" onClick={handleViewMore}>Mag-patuloy</button>
        </div>
      </div>
    </>
  );
};

export default Unangputok;

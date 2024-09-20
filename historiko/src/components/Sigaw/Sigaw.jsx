import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sigaw.css';
import taxreceipt from '../../assets/taxreceipt.jpg';
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
  const { addMarkedTopic, removeMarkedTopic } = useMarkedTopics();
  const topicId = 4; // Assuming "Sigaw ng Pugad Lawin" is the 4th topic
  const topicName = "Sigaw ng Pugad Lawin";

  useEffect(() => {
    if (user) {
      checkIfMarked();
    } else {
      setIsLoading(false);
    }

    const timer = setTimeout(() => {
      toast.info("Magpatuloy at alamin ang lahat tungkol sa Sigaw ng Pugad Lawin", {
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
            src={taxreceipt}
            alt="Sigaw ng Pugad Lawin illustration" 
            className="sigaw-image"
          />
          <h2 className="sigaw-date">Tax Receipt Torn by Members of the Katipunan</h2>
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
            Agosto 23, 1896 ay nagkita-kita ang mga katipunero sa Pugad Lawin. Sa utos ni Bonifacio ay sabay sabay na inilabas ng mga katipunero ang kanilang mga sedula at pinunit ito ng buong pagmamalaki at katapangan. <br /> At isinigaw ang mga katagang “Mabuhay ang Pilipinas, Mabuhay ang Kalayaan. Mabuhay! Mabuhay!”   at ito ay kinilala sa ating kasaysayan bilang unang sigaw sa pugad lawin.

            </p>
          </div>
          <button onClick={handleViewMore}>VIEW MORE</button>
        </div>
      </div>
    </>
  );
};

export default Sigaw;
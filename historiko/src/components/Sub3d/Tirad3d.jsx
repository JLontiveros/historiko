import React, { useEffect, useRef } from 'react';
import './Tirad3d.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReward } from '../context/RewardContext';
import { useAuth } from '../../App';
import arrownav2 from '../../assets/arrownav.png';
import badge from '../../assets/badge.png';
import {DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css';
import tiradvid from '../../assets/tiradvid.mp4';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../supabaseClient';

const Tirad3d = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveReward } = useReward();
  const { user } = useAuth();
  const secondSectionRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.showToast) {
      const userName = user ? user.name || user.username : 'Kaibigan'; // Use 'name' if available, fallback to 'username', or use 'Kaibigan' if user is not logged in
      toast.info(`Pagbati, ${userName}! Mag patuloy at panoorin ang 3d 'Labanan sa Tirad Pass'`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [location,user]);

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

  const updateProgress = async () => {
    if (user) {
      const userUUID = await getUserUUID(user.username);
      if (userUUID) {
        const { data, error } = await supabase
          .from('user_progress')
          .upsert(
            { user_id: userUUID, topic_id: 2, progress: 100 },
            { onConflict: ['user_id', 'topic_id'] }
          );

        if (error) {
          console.error('Error updating progress:', error);
        } else {
          console.log('Progress updated successfully to 100%');
        }
      }
    }
  };

  const handleGoBack = async () => {
    const rewardId = 2; // Replace with the correct reward ID
    
    if (user) {
      await updateProgress(); // Update progress to 100%
      const result = await saveReward(rewardId, user.id);
      
      if (result.success) {
        console.log(result.message);
        navigate(-1);
      } else {
        console.error(result.message);
        // Optionally, add a notification or alert to show the error to the user.
      }
    } else {
      console.error('No user is logged in');
      // Optionally, redirect to login page or show an alert
    }
  };

  const handleVideoEnd = () => {
    toast.success(<div style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={badge} 
        alt="Badge" 
        style={{ width: '50px', height: '50px', marginRight: '10px' }} 
      />
      <span>Gantimpala para sa pagtatapos ng talakayin ng Labanan sa Tirad Pass.</span>
    </div>,
     {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      },
      { threshold: 0.1 }
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    // YouTube iframe API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('youtube-player', {
        events: {
          'onReady': (event) => {
            event.target.playVideo();
          },
          'onStateChange': (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              handleVideoEnd();
            }
          }
        }
      });
    };

    return () => {
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current);
      }
    };
  }, []);

  return (
    <>
    <div className="Tirad3d">
    <ToastContainer />
      <div className="Tirad3d-container">
        <img src={arrownav2} alt="left" onClick={handleGoBack}/>
        <h1>Labanan sa Tirad Pass</h1>
      </div>
      <div className="picture3d">
        <div className="video-container">
        <iframe 
          id="youtube-player"
          ref={iframeRef}
          src="https://www.youtube.com/embed/3BKnS10E2Jc?si=iw8KAiELNhjuB271?si=SiZACwtsueR9u3uP?autoplay=1&unmute=1&controls=1&showinfo=0&rel=0&loop=0&playlist=3BKnS10E2Jc&enablejsapi=1&origin=http://localhost:3000&modestbranding=1" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
        </div>
      </div>
    </div>
    </>
  )
}

export default Tirad3d
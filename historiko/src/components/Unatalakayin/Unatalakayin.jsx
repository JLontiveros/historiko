import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Unatalakayin.css';
import Navbar from '../Navbar/Navbar';
import balangiga from '../../assets/balangiga.png';
import plaquetteImage from '../../assets/firstshot.png';
import tirad from '../../assets/tirad.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';

function Unatalakayin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Set default values for toast flags if they don't already exist
      if (localStorage.getItem('hasShownUnatalakyinToast') === null) {
        localStorage.setItem('hasShownUnatalakyinToast', 'false');
      }
      if (localStorage.getItem('hasShownDalwatalakyinToast') === null) {
        localStorage.setItem('hasShownDalwatalakyinToast', 'false');
      }

      // Check and display each toast message if the flag is false
      if (localStorage.getItem('hasShownUnatalakyinToast') === 'false') {
        const userName = user.name || user.username || 'Kaibigan';
        toast.info(`Kumusta, ${userName}! Halinat Talakayin ang Panahon ng Digmaan Pilipino-Amerikano!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [user]);

  const handleSeeMore = async (topicId, route) => {
    localStorage.setItem('hasShownUnatalakyinToast', 'true');
    if (user) {
      // First, try to fetch the current progress
      const { data: currentProgressData, error: fetchError } = await supabase
        .from('user_progress')
        .select('progress')
        .eq('user_id', user.id)
        .eq('topic_id', topicId)
        .single(); // This will fail if no row exists
  
      if (fetchError) {
        // If no row exists, fetchError will indicate that, so handle it gracefully.
        if (fetchError.code === 'PGRST116') {
          console.log('No existing progress, creating a new record');
        } else {
          console.error('Error fetching current progress:', fetchError);
          return;
        }
      }
  
      // If no error fetching, proceed to handle the data
      const currentProgress = currentProgressData ? currentProgressData.progress : 0;
  
      // Only update if current progress is less than 100
      if (currentProgress < 100) {
        const newProgress = Math.max(currentProgress, 20); // Ensure progress doesn't decrease
        const { data, error } = await supabase
          .from('user_progress')
          .upsert(
            { user_id: user.id, topic_id: topicId, progress: newProgress },
            { onConflict: ['user_id', 'topic_id'] }
          ); // Use upsert instead of insert to handle existing or new rows
  
        if (error) {
          console.error('Error updating progress:', error);
        } else {
          console.log(`Progress updated to ${newProgress}%`);
        }
      } else {
        console.log('Progress already at 100%, no update needed');
      }
    }
  
    // After handling progress update, navigate
    navigate(`/${route}`, { state: { showToast: true } });
  };
  
  const handleViewMore = async (e) => {
    e.preventDefault();
   
    navigate('/Unavid', { state: { showToast: true } });
  };
	  
  return (
    <div className="unatalakayin">
      <Navbar />
      <ToastContainer />
     
 
      <h1>Mga Talakayin</h1>
      

      <div className="events-container">

      <div className="events">
          <img src={plaquetteImage} alt="firstshot" className="event-icon" />
          <br></br>
          <br></br>
          <h2>Unang Putok sa panlulukan ng Silencio at Sociego, Sta.Mesa</h2>
          <p>Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga Amerikano sa mga Pilipino</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(1, 'unangputok')} className="link-button">Talakayin natin</button>
            </div>
        </div>
        <div className="events">
          <img src={tirad} alt="sword" className="event-icon" />
          <br></br>
          <h2>Labanan sa Tirad Pass</h2>
          <p>Nangyari ang isa sa makasaysayang sagupaan ng mga rebolusyonaryong Pilipino, ang Labanan sa Pasong Tirad sa pangunguna ni Heneral Gregorio Del Pilar.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(2, 'tiradpass')} className="link-button">Talakayin natin</button>
            </div>
        </div>
        <div className="events">
          <img src={balangiga} alt="Bell" className="event-icon" />
          <br></br>
          <h2>Balangiga Massacre</h2>
          <p>Pinakatanyag na labanan sa pagitan ng mga Amerikano at mga Pilipino ay ang labanan sa Balangiga na nangyari sa pamumuno ni Heneral Vicente Lukban sa Isla ng Samar.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(3, 'balangiga')} className="link-button">Talakayin natin</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Unatalakayin;

import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
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
    if (location.state?.showToast && location.state?.fromModules) {
      const userName = user ? user.name || user.username : 'Kaibigan'; // Use 'name' if available, fallback to 'username', or use 'Kaibigan' if user is not logged in
      toast.info(`Kumusta, ${userName}! Halinat Talakayin ang Panahon ng Digmaan Pilipino-Amerikano!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem('hasShownUnatalakyinToast', 'true');
    }
  }, [location, user]);

  const handleSeeMore = async (topicId, route) => {
    if (user) {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert(
          { user_id: user.id, topic_id: topicId, progress: 20 },
          { onConflict: ['user_id', 'topic_id'] }
        );

      if (error) {
        console.error('Error updating progress:', error);
      }
    }
    navigate(`/${route}`, { state: { showToast: true } });
  };

  return (
    <div className="unatalakayin">
      <Navbar />
      <ToastContainer />
      <h1>Mga Talakayin</h1>
      <div className="events-container">
        <div className="events">
          <img src={plaquetteImage} alt="firstshot" className="event-icon" />
          <h2>Unang Putok sa panlulukan ng Silencio at Sociego, Sta.Mesa</h2>
          <p>Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga amerikano sa mga Pilipino</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(1, 'unangputok')} className="link-button">See more</button>
            </div>
        </div>
        <div className="events">
          <img src={tirad} alt="sword" className="event-icon" />
          <h2>Labanan sa Tirad Pass</h2>
          <p>Nangyari ang isa sa makasaysayang sagupaan ng mga rebolusyonaryong Pilipino, ang Labanan sa Pasong Tirad sa pangunguna ni Heneral Gregorio Del Pilar.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(2, 'tiradpass')} className="link-button">See more</button>
            </div>
        </div>
        <div className="events">
          <img src={balangiga} alt="Bell" className="event-icon" />
          <h2>Balangiga Massacre</h2>
          <p>Pinakatanyag na labanan sa pagitan ng mga amerikano at mga Pilipino ay ang labanan sa balangiga na nangyari sa pamumuno ni Heneral Vicente Lukban sa Isla ng Samar.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(3, 'balangiga')} className="link-button">See more</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Unatalakayin;
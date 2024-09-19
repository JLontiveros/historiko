import React, { useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import './Dalwatalakayin.css';
import Navbar from '../Navbar/Navbar';
import biaknabato from '../../assets/biaknabato.png';
import pugadlawin from '../../assets/pugadlawin.png';
import tejeros2 from '../../assets/tejeros2.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';


function Dalwatalakayin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (location.state && location.state.showToast) {
      toast.info("Halinat talakayin ang Panahon ng Himagsikang Pilipino!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem('hasShownDalwatalakyinToast', 'true');
    }
  }, [location]);

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
    <div className="dalwatalakayin">
      <Navbar />
      <ToastContainer />
      <h1>Mga Talakayin</h1>
      <div className="events-container">
        <div className="event">
          <img src={pugadlawin} alt="firstshot" className="event-icon" />
          <h2>Sigaw ng Pugad-Lawin</h2>
          <p>Ang mga kasapi ng katastaasan kagalanggalangang katipunan ng mga anak ng Bayan (KKK) o Katipunan ay sabay-sabay pinunit ang kani kanilang sedula bilang tanda ng kanilang pagtutol sa pamamahala ng mga espanyol.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(4, 'sigaw')} className="link-button">See more</button>
            </div>
        </div>
        <div className="event">
          <img src={tejeros2} alt="sword" className="event-icon" />
          <h2>Tejeros Convention</h2>
          <p>Ang kumbensiyon sa Tejeros na naganap noong Marso 22, 1897 ay isang pagpupulong sa Casa Hacienda de Tejeros, San Francisco de Malabon sa Cavvite na may layuning pagkasunduin ang dalwang paksiyon sa cavite.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(5, 'tejeros')} className="link-button">See more</button>
            </div>
        </div>
        <div className="event">
          <img src={biaknabato} alt="Bell" className="event-icon" />
          <h2>Kasunduan sa Biak-na-Bato</h2>
          <p>Biak na bato lugar na matatagpuan sa Miguel de mayumo, bulacan na nagsisilbing kuta nina Aguinaldo sa panahon ng pakikidigma nila sa mga espanyol</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(6, 'bato')} className="link-button">See more</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dalwatalakayin;
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
    if (location.state?.showToast && location.state?.fromModules) {
      const userName = user ? user.name || user.username : 'Kaibigan'; // Use 'name' if available, fallback to 'username', or use 'Kaibigan' if user is not logged in
      toast.info(`Kumusta, ${userName}! Halinat talakayin ang Panahon ng Himagsikang Pilipino!`, {
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
  }, [location,user]);

  const handleSeeMore = async (topicId, route) => {
    if (user) {
      // First, fetch the current progress
      const { data: currentProgressData, error: fetchError } = await supabase
        .from('user_progress')
        .select('progress')
        .eq('user_id', user.id)
        .eq('topic_id', topicId)
        .single();

      if (fetchError) {
        console.error('Error fetching current progress:', fetchError);
      } else {
        const currentProgress = currentProgressData ? currentProgressData.progress : 0;

        // Only update if current progress is less than 100
        if (currentProgress < 100) {
          const newProgress = Math.max(currentProgress, 20); // Ensure progress doesn't decrease
          const { data, error } = await supabase
            .from('user_progress')
            .upsert(
              { user_id: user.id, topic_id: topicId, progress: newProgress },
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
          <p>Ang sigaw sa Pugad Lawin ay isa sa mga patunay ng matinding pagnanais ng mga Pilipino na makamit ang kalayaan mula sa mga Espanyol. Hindi lamang pagpunit ng Cedula ang dapat bigyaang diin sa Unang Sigaw gayundin ang mga pagpupulong at pagpaplano ng mga Katipuneor upang itaguyod ang rebolusyon.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(4, 'sigaw')} className="link-button">See more</button>
            </div>
        </div>
        <div className="event">
          <img src={tejeros2} alt="sword" className="event-icon" />
          <h2>Tejeros Convention</h2>
          <p>Ang layunin ng Kumbensiyon sa Tejeros ay upang ayusin ang hindi pagkakaunawaan sa pagitan ng dalawang pangkat ng Katipunan sa Cavite at upang bumuo ng isang rebolusyunaryong pamahalaan. Ngunit sa halip na magkaisa, lalo pang tumindo ang hidwaan na humantong sa pagkamatay ni Andres Bonifacio.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(5, 'tejeros')} className="link-button">See more</button>
            </div>
        </div>
        <div className="event">
          <img src={biaknabato} alt="Bell" className="event-icon" />
          <h2>Kasunduan sa Biak-na-Bato</h2>
          <p>Ang kasunduan sa Biak-na- Bato ay isinagawa upang magkaroon ng kapayapaan sa bansa ngunit ang kawalan ng tiwala sa parehong panig ng mga Espanyol at Pilipino ang nagging dahilan upang mabigo at mling sumiklab ang digmaan</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(6, 'bato')} className="link-button">See more</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dalwatalakayin;
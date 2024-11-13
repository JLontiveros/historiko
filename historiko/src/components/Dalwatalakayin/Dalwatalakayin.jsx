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
    if (user) {
      // Set default values for toast flags if they don't already exist
      if (localStorage.getItem('hasShownUnatalakyinToast') === null) {
        localStorage.setItem('hasShownUnatalakyinToast', 'false');
      }
      if (localStorage.getItem('hasShownDalwatalakyinToast') === null) {
        localStorage.setItem('hasShownDalwatalakyinToast', 'false');
      }

      if (localStorage.getItem('hasShownDalwatalakyinToast') === 'false') {
        // Adjust this toast message as needed
        toast.info(`Maligayang Pagdating sa Dalwatalakayin!`, {
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
    localStorage.setItem('hasShownDalwatalakyinToast', 'true');
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
  

  return (
    <div className="dalwatalakayin">
      <Navbar />
      <ToastContainer />
      <h1>Mga Talakayin</h1>
      <div className="events-container">
        <div className="event">
          <img src={pugadlawin} alt="firstshot" className="event-icon" />
          <h2>Sigaw ng Pugad-Lawin</h2>
          <p>Ang sigaw sa Pugad Lawin ay isa sa mga patunay ng matinding pagnanais ng mga Pilipino na makamit ang kalayaan mula sa mga Espanyol. Hindi lamang pagpunit ng Cedula ang dapat bigyaang diin sa Unang Sigaw gayundin ang mga pagpupulong at pagpaplano ng mga Katipunero upang itaguyod ang rebolusyon.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(4, 'sigaw')} className="link-button">Talakayin natin</button>
            </div>
        </div>
        <div className="event">
          <img src={tejeros2} alt="sword" className="event-icon" />
          <h2>Tejeros Convention</h2>
          <p>Ang layunin ng Kumbensiyon sa Tejeros ay upang ayusin ang hindi pagkakaunawaan sa pagitan ng dalawang pangkat ng Katipunan sa Cavite at upang bumuo ng isang rebolusyunaryong pamahalaan. Ngunit sa halip na magkaisa, lalo pang tumindi ang hidwaan na humantong sa pagkamatay ni Andres Bonifacio.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(5, 'tejeros')} className="link-button">Talakayin natin</button>
            </div>
        </div>
        <div className="event">
          <img src={biaknabato} alt="Bell" className="event-icon" />
          <h2>Kasunduan sa Biak-na-Bato</h2>
          <p>Ang kasunduan sa Biak-na- Bato ay isinagawa upang magkaroon ng kapayapaan sa bansa ngunit ang kawalan ng tiwala sa parehong panig ng mga Espanyol at Pilipino ang naging dahilan upang mabigo at muling sumiklab ang digmaan.</p>
            <div className="event-link">
              <button onClick={() => handleSeeMore(6, 'bato')} className="link-button">Talakayin natin</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dalwatalakayin;
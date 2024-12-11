import React, { useState, useEffect } from 'react';
import ChatBox from '../Chat/ChatBot';
import { useNavigate, useLocation } from 'react-router-dom';
import './Putok.css';
import star from '../../assets/star.jfif';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import azcarraga from '../../assets/azcarraga.png';
import emilio from '../../assets/emilio.png';
import tutol from '../../assets/tutol.png';
import panawagan from '../../assets/panawagan1.png';
import plano from '../../assets/plano.png';
import loma from '../../assets/loma.png';
import genelwell from '../../assets/genduo.png';
import genluna from '../../assets/genluna.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const Putok = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const topicId = 1;
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);
  const [currentHeading, setCurrentHeading] = useState("Unang pangyayari");

  const images = [
    { src: emilio, bg: emilio, description: "Emilio Aguinaldo" },
    { src: tutol, bg: tutol, description: "Pagtutol ng Senador" },
    { src: genelwell, bg: genelwell, description: "Heneral Elwell Otis at Henry Lawton" },
    { src: panawagan, bg: panawagan, description: "Panawagan ni Aguinaldo sa Mamamayan (Pebrero 6, 1899)" },

    { src: genluna, bg: genluna, description: "Heneral Antonio Luna" },
    { src: loma, bg: loma, description: "Labanan sa La Loma (Pebrero 10, 1899)" },
    { src: plano, bg: plano, description: "Pagplano ng Kontra-opensiba ng mga Pilipino (Pebrero-Marso 1899)" },
    { src: azcarraga, bg: azcarraga, description: "Azcarraga" },
  ];

  const descriptions = [
    "Bagamat pormal na pinagkaloob ng Espana ang Pilipinas sa Estados Unidos, ipinagpatuloy ni Aguinaldo ang pagtatatag ng pamahalaan. Noong Enero 23, 1899, pinasinayaan ang Unang Republika sa Malolos, Bulacan. Hindi kinilala ng mga Amerikano at iba pang dayuhang bansa ang pamahalaang ito. Subalit kinilala ito ng mga mamamayang Pilipino at itinaguyod ang kapangyarihan ng Republika ng Pilipinas sa pamununo ni Aguinaldo bilang Pangulo. Buong magdamag na sinalakay ng mga Amerikano ang Maynila. Nagpadala si Emilio ng kinatawan kay Gen. Elwell Otis upang hingin ang pagtigil ng labanan upang hindi magdulot ng pinsala sa magkabilang panig.",
    "Habang sumiklab ang digmaan, nagkaroon ng pagtatalo sa Senado ng Amerika kung nararapat bang sakupin ang Pilipinas. Ang mga anti-imperialist ay nagpahayag ng pagtutol sa ginawang pagsalakay ng mga sundalong Amerikano sa mga Pilipino, ngunit nanaig ang layunin ng gobyerno ng Estados Unidos na gawing kolonya ang Pilipinas.",
    "Hindi pinaunlakan ni Heneral Elwell Otis at sinabing 'Fighting, has begun, must go on to the grim end'. Si General Elwell Otis ang namuno sa pagsalakay sa hilagang Maynila at Si Gen. Henry Lawton ang namuno sa pagsalakay sa timog Maynila. Walang nagawa si Aguinaldo kundi ang magdeklara ng pakikidigma at makipagpalitan ng putok laban sa mga Amerikano. Ang hindi pagkilala ng Estados Unidos sa Republika ng Pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga amerikano sa mga Pilipino at napatunayan ng mga Pilipino na ang tunay na hangarin ng mga Amerikano ay sakupin ang Pilipinas.",
    "Dahil sa agarang pagsalakay ng mga Amerikano sa Maynila at karatig na bayan, nanawagan si Emilio Aguinaldo sa mamamayang Pilipino na ipagtanggol ang kalayaan ng bansa. Sa kanyang proklamasyon, hinikayat niya ang lahat ng mga kalalakihan na sumama sa hukbo upang labanan ang mga mananakop.",
    "Pebrero 5, 1899, Binomba ng mga Amerikano ang San Juan, at sinalakay ang Marikina, Guadalupe at Caloocan. Buong tapang at gilas na hinadlangan ito ng pinuno ng hukbong Pilipino sa pamumuno ni General Antonio Luna ngunit sila ay natalo at umurong at nagtungo sa Pulo, Bulacan.",
    "Matapos umatras ang mga hukbo ni General Antonio Luna mula sa Guadalupe at Caloocan, muling nagkaroon ng sagupaan sa La Loma. Bagamat natalo ang mga Pilipino, ipinakita ni Luna ang kanyang kahusayan sa estratehiya, na nagbigay ng malaking hamon sa hukbong Amerikano.",
    "Matapos ang sunod-sunod na pagkatalo, nagplano si General Antonio Luna ng kontra-opensiba laban sa mga Amerikano. Naging mahalaga ang kanyang pagtatag ng depensa sa hilaga, partikular sa Pampanga, upang mabawasan ang pag-abante ng mga Amerikano sa Luzon.",
    "Upang hindi pakinabangan ng mga Amerikano ang tahanan, doon iniutos ni General Antonio Luna na sunugin ito habang umuurong sila sa laban. Nakarating sina Antonio Luna sa Daang Azcarraga (ngayo'y Claro M. Recto) ngunit sila ay natalo. Sunod-sunod na ring nabihag ng mga Amerikano ang ibang lugar sa paligid ng Maynila dahil sa galing ng sandatahang lakas nito.",
  ];

  const headings = [
    "Unang Pangyayari",
    "Ikalawang Pangyayari",
    "Ikatlong Pangyayari",
    "Ika-apat na Pangyayari",
    "Ika-limang Pangyayari",
    "Ika-anim na Pangyayari",
    "Ika-pitong Pangyayari",
    "Ika-walong Pangyayari",
  ];

  // Initialize localStorage on component mount
  useEffect(() => {
    if (!localStorage.getItem('hasViewedputok3D')) {
      localStorage.setItem('hasViewedputok3D', 'false');
    }
  }, []);

  // Show toast only once when component mounts
  useEffect(() => {
    if (user && localStorage.getItem('hasViewedputok3D') === 'false' && !hasShownToast) {
      const userName = user.name || user.username || 'Kaibigan';
      toast.info(
        <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
          <img 
            src={star} 
            alt="Star" 
            style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '20px'}} 
          />
          <span style={{width: '180px'}}>
            Paunang gantimpala, {userName}! Sapagkat ika'y nakarating dito!
          </span>
        </div>, 
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setHasShownToast(true);
    }
  }, [user, hasShownToast]); // Only depend on user and hasShownToast

  // Update background image
  useEffect(() => {
    document.body.style.backgroundImage = `url(${images[selectedImage].bg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    };
  }, [selectedImage]);

  const handlePrev = (e) => {
    e.preventDefault();
    setSelectedImage((prev) => {
      const newIndex = prev > 0 ? prev - 1 : images.length - 1;
      setCurrentHeading(headings[newIndex]);
      return newIndex;
    });
  };
  
  const handleNext = async (e) => {
    e.preventDefault();
    if (selectedImage === 7) {
      
        // Show SweetAlert prompt
        Swal.fire({
          title: 'Next topic?',
          text: "You are about to proceed to the next topic.",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed',
          cancelButtonText: 'No, stay here'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to the "kasunduan" link if confirmed
            window.location.href = '/tirad';
          }
        });

         return newIndex;
    
  }
    setSelectedImage((prev) => {
      const newIndex = prev < images.length - 1 ? prev + 1 : 0;
      setCurrentHeading(headings[newIndex]);
  
      // If on the last slide, mark progress as complete
      if (newIndex === images.length - 1 && user) {
        updateProgressToComplete(); // Call function to update progress to 100%
      } else {
        // Update progress dynamically if it's less than 100%
        const progressPercentage = ((newIndex + 1) / images.length) * 100;
        if (progressPercentage < 100) {
          updateProgressToPercentage(progressPercentage); // Dynamically update progress
        }
      }
  
      return newIndex;
    });
  };
  
  const updateProgressToPercentage = async (progressPercentage) => {
    if (user) {
      try {
        const userUUID = await getUserUUID(user.username);
        if (userUUID) {
          const { error } = await supabase
            .from('user_progress')
            .upsert(
              { 
                user_id: userUUID, 
                topic_id: topicId, 
                progress: Math.min(progressPercentage, 100) // Ensure the progress does not exceed 100%
              },
              { onConflict: ['user_id', 'topic_id'] }
            );
  
          if (error) {
            console.error('Error updating progress:', error);
          } else {
            console.log(`Progress updated to ${Math.min(progressPercentage, 100)}%`);
          }
        }
      } catch (err) {
        console.error('Error fetching user UUID or updating progress:', err);
      }
    }
  };
   
  
  // Function to mark progress as 100%
  const updateProgressToComplete = async () => {
    if (user) {
      const userUUID = await getUserUUID(user.username);
      if (userUUID) {
        const { error } = await supabase
          .from('user_progress')
          .upsert(
            { user_id: userUUID, topic_id: topicId, progress: 100 },
            { onConflict: ['user_id', 'topic_id'] }
          );
  
        if (error) {
          console.error('Error updating progress to 100%:', error);
        } else {
          console.log('Progress updated to 100%');
        }
      }
    }
  };
  

  const toggleZoom = (e) => {
    e.preventDefault();
    setIsZoomed(!isZoomed);
  };

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

  const handleViewMore = async (e) => {
    e.preventDefault();
    localStorage.setItem('hasViewedputok3D', 'true');
    if (user) {
      const userUUID = await getUserUUID(user.username);
      if (userUUID) {
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

          if (currentProgress < 100) {
            const newProgress = Math.max(currentProgress, 70);
            const { error } = await supabase
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
    navigate('/Putok3d', { state: { showToast: true } });
  };

  const handleHeadingClick = (index) => {
    setSelectedImage(index);
    setCurrentHeading(headings[index]);
  };

  const progressPercentage = ((selectedImage + 1) / images.length) * 100;

  return (
    <div className="putok">
      <ToastContainer />
      <button onClick={handleViewMore} className='viewputok'>View in Video</button>
      <div className="putok-container">
        <div className="putok-description-container">
          <h1>Deskripsyon:</h1>
          <h2>{currentHeading}</h2>
          <p>{descriptions[selectedImage]}</p>
        </div>
        <div className="putok-image-container">
        {[...Array(3)].map((_, index) => {
          const imageIndex = (selectedImage + index) % images.length;
          return (
            <div
              key={imageIndex}
              className={`putok-image-wrapper ${index === 0 ? 'selected' : ''} ${
                isZoomed && index === 0 ? 'zoomed' : ''
              }`}
              onClick={(e) => index === 0 ? toggleZoom(e) : setSelectedImage(imageIndex)}
              style={{
                order: index,
                zIndex: 2 - index
              }}
            >
              <img src={images[imageIndex].src} alt={`Image ${imageIndex + 1}`} />
              <div className="putok-image-description">{images[imageIndex].description}</div>
            </div>
          );
        })}
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="putok-arrow-keys">
        <img src={arrownav2} alt="left" onClick={handlePrev} />
        <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
</div>
      </div>
      <div className="putok-headings">
        {headings.map((heading, index) => (
          <button
            key={index}
            className={`heading-button ${index === selectedImage ? 'active' : ''}`}
            onClick={() => handleHeadingClick(index)}
          >
            {heading}
          </button>
        ))}
      </div>
      
    <ChatBox /> 
</div>
  );       


};

export default Putok;
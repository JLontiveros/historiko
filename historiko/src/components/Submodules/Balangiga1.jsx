import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Balangiga1.css';
import star from '../../assets/star.jfif';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import bg1 from '../../assets/kidst.png'; // Add your background images
import genjacob from '../../assets/genjacob.png';
import kirambates from '../../assets/kirambates.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Balangiga1 = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const topicId = 3;
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);
  const [currentHeading, setCurrentHeading] = useState("Unang pangyayari");

  const images = [
    { src: genjacob, bg: genjacob, description: "Brig. Gen Jacob Smith"  },
    { src: kirambates, bg: kirambates, description: "Kiram Bates Treaty 1899"  },
  ];

  const descriptions = [
    "Bilang ganti ay ipinadala ang malaking bilang ng mga sundalong Amerikano sa pangunguna ni Brigadier  Gen Jacob Smith. Malawakang pagpatay at pagsunog sa mga ari-arian ang isingawa nila sa Balangiga. ANg lahat ng kalalakihang may kakayahang humawak ng armas mula 10 taong gulang pataas ay pinagutos na patayin. Sa loob ng anim na buwan ang balangiga ay nagmistulang isang disyerto dahil sinunog ng mga amerikano ang buong baying ito.",
    "Ang mga moro sa Mindanao at Sulu ay nanahimik, at nagmasid lamang upang hindi masangkot sa digmaan. Lumagda ng isang kasunduan si Brigadier General John C. Bates at si Sultan Jamal ul Kiram II kasama ang mga kinatawang datu ng sulu noong Agosto 10, 1899 na nagsasaad na kinikilala ng Sultan ang kapangyarihan ng Estados Unidos sa buong kapuluan ng Sulu, Igagalang ng estados unidos ang mga karapatan at karangalan ng sultan ang kaniyang mga datu; at hindi makikialam ang estados unidos sa relihiyon ng mga moro.  Hindi kinilala ang kasunduang Bates makalipas ang dalawang taon ay pinuksa ng mga amerikano ang mga muslim sa Mindanao matapos nilang matalo ang mga Pilipino sa Luzon.",
  ];

  const headings = [
    "Unang pangyayari",
    "Ikalawang pangyayari",
  ];

  useEffect(() => {
    if (location.state?.showToast && !hasShownToast) {
      const userName = user ? user.name || user.username : 'Kaibigan'; // Use 'name' if available, fallback to 'username', or use 'Kaibigan' if user is not logged in
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
  
    // ... (rest of the useEffect for background image)
  }, [selectedImage, location.state, user, hasShownToast]);


  const handlePrev = (e) => {
    e.preventDefault();
    setSelectedImage((prev) => {
      const newIndex = prev > 0 ? prev - 1 : images.length - 1;
      setCurrentHeading(headings[newIndex]);
      return newIndex;
    });
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    setSelectedImage((prev) => {
      const newIndex = prev < images.length - 1 ? prev + 1 : 0;
      setCurrentHeading(headings[newIndex]);
      return newIndex;
    });
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
    if (user) {
      const userUUID = await getUserUUID(user.username);
      if (userUUID) {
        const { data, error } = await supabase
          .from('user_progress')
          .upsert(
            { user_id: userUUID, topic_id: topicId, progress: 70 }, 
            { onConflict: ['user_id', 'topic_id'] }
          );

        if (error) {
          console.error('Error updating progress:', error);
        } else {
          console.log('Progress updated successfully to 70%');
        }
      }
    }
    navigate('/Balangiga3d', { state: { showToast: true } });
  };

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

  return (
    <div className="balangiga1">
      <ToastContainer/>
      <button onClick={handleViewMore}>View in 3D</button>
      <div className="balangiga1-container">
        <div className="balangiga1-description-container">
          <h1>Description:</h1>
          <h2>{currentHeading}</h2>
          <p>{descriptions[selectedImage]}</p>
        </div>
        <div className="balangiga1-image-container">
          {[...Array(2)].map((_, index) => {
            const imageIndex = (selectedImage + index) % images.length;
            return (
              <div
                key={imageIndex}
                className={`balangiga1-image-wrapper ${index === 0 ? 'selected' : ''} ${
                  isZoomed && index === 0 ? 'zoomed' : ''
                }`}
                onClick={(e) => index === 0 ? toggleZoom(e) : setSelectedImage(imageIndex)}
                style={{
                  order: index,
                  zIndex: 2 - index
                }}
              >
                <img src={images[imageIndex].src} alt={`Image ${imageIndex + 1}`} />
                <div className="balangiga1-image-description">{images[imageIndex].description}</div>
              </div>
            );
          })}
        </div>
        <div className="balangiga1-arrow-keys">
          <img src={arrownav2} alt="left" onClick={handlePrev} />
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Balangiga1;
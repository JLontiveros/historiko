import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Balangiga1.css';
import star from '../../assets/star.jfif';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import capthomas from '../../assets/capthomas.png';
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
    { src: capthomas, bg: capthomas, description: "Captain Thomas Connelll" },
    { src: genjacob, bg: genjacob, description: "Brigadier Gen Jacob Smith" },
    { src: kirambates, bg: kirambates, description: "Kiram Bates Treaty 1899" },
  ];

  const descriptions = [
    "Sa simula ay naging maganda ang pakikisalamuha ng mamamayan ng Balangiga sa mga sundalong Amerikano, ngunit lingid sa kaalaman ng mga Amerikano ay mayroong ugnayan ang mga mamamayan sa pangkat ni Vicente Lukban. Setyembre 28, 1901, isinagawa ang planong pagpatay sa buong pangkat ng Amerikanong sundalo sa tulong ng mga mamamayan ng Balangiga. Sa 74 na miyembro ng Company C ay 36 ang nasawi kasama si Captain Thomas Connell, 22 ang sugatan at 4 ang nawala. Dalawa lamang ang sinasabing hindi nasugatan.",
    "Bilang ganti ay ipinadala ang malaking bilang ng mga sundalong Amerikano sa pangunguna ni Brigadier General Jacob Smith. Malawakang pag-patay at pag-sunog sa mga ari-arian ang isinagawa nila sa Balangiga. Ang lahat ng kalalakihang may kakayahang humawak ng armas mula 10 taong gulang pataas ay pinag-utos na patayin. Sa loob ng anim na buwan ang Balangiga ay nagmistulang isang disyerto dahil sinunog ng mga Amerikano ang buong bayang ito.",
    "Bahagi ng pananakop sa isang bansa ay ang pagkontrol nito sa ekonomiya. Kung tutuusin, ito ang pangunahing dahilan ng Amerika sa pananakop sa Pilipinas sa pagnanais nitong makihati sa malaking kinikita ng bansang Kanluranin sa Tsina. Kaya naman, pinilit sa huli na makuha ang Pilipinas upang magsilbing base militar nito sa Asya, ngunit isa sa mga humamon sa kagustuhang ito ng mga Amerikano ay ang Mindanao. Panahon pa lamang ng mga Espanyol ay mailap na ang Mindanao dahil sa lakas ng Islam na syang pangunahing elementong nagbibigkis dito. Ang mga Moro sa Mindanao at Sulu ay nanahimik, at nagmasid lamang upang hindi masangkot sa digmaan. Lumagda ng isang kasunduan si Brigadier General John C. Bates at ang sultan ng Jolo na si Sultan Jamal Ul Kiram II kasama ang mga kinatawang datu ng Sulu noong Agosto 10, 1899 at tinawag ito na Kasunduang Bates na nagsasaad na kinikilala ng Sultan ang kapangyarihan ng Estados Unidos sa buong kapuluan ng Sulu, Igagalang ng Estados Unidos ang mga karapatan at karangalan ng sultan ang kaniyang mga datu; at hindi makikialam ang Estados Unidos sa relihiyon ng mga Moro. Hindi kinilala ang kasunduang Bates makalipas ang dalawang taon ay pinuksa ng mga Amerikano ang mga Muslim sa Mindanao matapos nilang matalo ang mga Pilipino sa Luzon.",
  ];

  const headings = [
    "Unang Pangyayari",
      "Ikalawang Pangyayari",
      "Ikatlong Pangyayari",
  ];

  useEffect(() => {
    if (!localStorage.getItem('hasViewedbalangiga3D') === null) {
      localStorage.setItem('hasViewedbalangiga3D', 'false');
    }
  }, []);

  useEffect(() => {
    if (user && localStorage.getItem('hasViewedbalangiga3D') === 'false' && !hasShownToast) {
      const userName = user ? user.name || user.username : 'Kaibigan';
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
  }, [user, hasShownToast]);

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
    localStorage.setItem('hasViewedbalangiga3D', 'true');
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
            const newProgress = Math.max(currentProgress, 70); // Ensure progress doesn't decrease
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
    // Navigate regardless of whether the progress was updated or not
    navigate('/Balangiga3d', { state: { showToast: true } });
  };

  const handleHeadingClick = (index) => {
    setSelectedImage(index);
    setCurrentHeading(headings[index]);
  };

  return (
    <div className="balangiga1">
      <ToastContainer/>
      <button onClick={handleViewMore} className="view">View in 3D</button>
      <div className="balangiga1-container">
        <div className="balangiga1-description-container">
          <h1>Deskripsyon:</h1>
          <h2>{currentHeading}</h2>
          <p>{descriptions[selectedImage]}</p>
        </div>
        <div className="balangiga1-image-container">
          {[...Array(3)].map((_, index) => {
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
      <div className="balangiga1-headings">
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
    </div>
  );
};

export default Balangiga1;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Putok.css';
import kidst from '../../assets/kidst.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import bg1 from '../../assets/kidst.png';
import emilio from '../../assets/emilio.png';
import genduo from '../../assets/genduo.png';
import genluna from '../../assets/genluna.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';

const Putok = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const topicId = 1;

  const images = [
    { src: emilio, bg: emilio, description: "Emilio Aguinaldo" },
    { src: genduo, bg: genduo, description: "General Elwell Otis" },
    { src: genduo, bg: genduo, description: "General Henry Lawton" },
    { src: genluna, bg: genluna, description: "General Antonio Luna" },
  ];

  const descriptions = [
    "Bagamat pormal na pinagkaloob ng Espana ang pilipinas sa estados unidos, ipinagpatuloy ni Aguinaldo ang pagtatatag ng pamahalaan. Noong Enero 23, 1899, pinasinayaan ang Unang Republika sa Malolos, Bulacan. Hindi kinilala ng mga amerikano at iba pang dayuhang bansa ang pamahalaang ito. Subalit kinilala ito ng mga mamamayang Pilipino at itinaguyod ang kapangyarihan ng Republika ng Pilipinas sa pamununo ni Aguinaldo bilang Pangulo.. Buong magdamag na sinalakay ng mga Amerikano ang Maynila. Nagpadala si Emilio ng kinatawan kay Gen. Elwell Otis upang hingin ang pagtigil ng labanan upang hindi magdulot ng pinsala sa magkabilang panig.",
    "Hindi pinaunlakan ni Gen Elwell Otis at sinabing “ Fighting, having begun, must go on to the grim end”. Si General Elwell Otis ang namuno sa pagsalakay sa hilagang Maynila at Si Gen. Henry Lawton ang namuno sa pagsalakay sa timog Maynila. Walang nagawa si Aguinaldo kundi ang magdeklara ng pakikidigma at makipagpalitan ng putok laban sa mga amerikano. ANg hindi pagkilala ng Estados Unidos sa republika ng pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga amerikano sa mga Pilipino at napatunayan ng mga Pilipino na ang tunay na hangarin ng mga arikano ay sakupin ang pilipinas.",
    "Hindi pinaunlakan ni Gen Elwell Otis at sinabing “ Fighting, having begun, must go on to the grim end”. Si General Elwell Otis ang namuno sa pagsalakay sa hilagang Maynila at Si Gen. Henry Lawton ang namuno sa pagsalakay sa timog Maynila. Walang nagawa si Aguinaldo kundi ang magdeklara ng pakikidigma at makipagpalitan ng putok laban sa mga amerikano. ANg hindi pagkilala ng Estados Unidos sa republika ng pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga amerikano sa mga Pilipino at napatunayan ng mga Pilipino na ang tunay na hangarin ng mga arikano ay sakupin ang pilipinas.",
    "Pebrero 5, 1899, Binomba ng mga amerikano ang san juan, at sinalakay ang Marikina, Guadalupe at caloocan. Buong tapang at gilas na hinadlangan ito ng pinuno ng hukbong Pilipino sa pamumuno ni General Antonio Luna ngunit sila ay natalo at umurong at nagtungo sa Pulo, Bulacan."
  ];

  const handlePrev = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };
  
  const handleNext = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const toggleZoom = () => {
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

  const handleViewMore = async () => {
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
    navigate('/Putok3d', { state: { showToast: true } });
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
    <div className="putok">
      <button onClick={handleViewMore}>View in 3D</button>
      <div className="putok-container">
        <div className="putok-description-container">
          <h1>Description:</h1>
          <p>{descriptions[selectedImage]}</p>
        </div>
        <div className="putok-image-container">
        {images.map((image, index) => (
            <div
            key={index}
            className={`putok-image-wrapper ${index === selectedImage ? 'selected' : ''} ${
              isZoomed && index === selectedImage ? 'zoomed' : ''
            }`}
            onClick={index === selectedImage ? toggleZoom : () => setSelectedImage(index)}
            style={{
              order: index === selectedImage ? -1 : 0,
              zIndex: index === selectedImage ? 2 : 1
            }}
          >
            <img src={image.src} alt={`Image ${index + 1}`} />
            <div className="putok-image-description">{image.description}</div>
          </div>
          ))}
        </div>
        <div className="putok-arrow-keys">
          <img src={arrownav2} alt="left" onClick={handlePrev} />
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Putok;
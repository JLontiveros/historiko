import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PugadLawin.css';
import kidst from '../../assets/kidst.png';
import star from '../../assets/star.jfif';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import andresboni from '../../assets/andresboni.png';
import bg2 from '../../assets/historikobg.png';
import watawat from '../../assets/watawat.png';
import trianggulo from '../../assets/trianggulo.png';
import katipunan from '../../assets/katipunan.png';
import pactodesangre from '../../assets/pactodesangre.png';
import baldoandfrends from '../../assets/baldoandfrends.png';
import faction from '../../assets/faction.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PugadLawin = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const topicId = 4;
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);

  const images = [
    { src: andresboni, bg: andresboni, description: "Andres Bonifacio" },
    { src: kidst, bg: bg2, description: "Andres Bonifacio" },
    { src: watawat, bg: watawat, description: "" },
    { src: trianggulo, bg: trianggulo, description: "Trianggulong Sistema" },
    { src: katipunan, bg: katipunan, description: "Mga kasapi ng katipunan" },
    { src: pactodesangre, bg: pactodesangre, description: "Pacto De Sangre" },
    { src: baldoandfrends, bg: baldoandfrends, description: "Gen Mariano Alvarez" },
    { src: faction, bg: faction, description: "Magdalo Faction Magdiwang Faction" },
  ];

  const descriptions = [
    "Maraming sumuporta kay Andres Bonifacio dahil mahusay siyang lider. Nagkasundo sila na ipagpatuloy ang paghihimagsik. Siya ay binansagang (Ama ng Katipunan). Siya ang nagtatag at lumaon naging Supremo ng kilusang Katipunan na naglayong makamtan ang kasarinlan ng Pilipinas mula sa Espanya at nagpasimula ng Himagsikang Pilipino.",
    "Inisip ng mga Pilipino na hndi na nila makakamit ang hinihinging pagbabago sa mapayapang paraan, at ang tanging paraan na lamang upang mabago ang pamumuhay ng mga Pilipino ay ang pagpapaalis ng mga espanyol sa pamamagitan ng rebolusyon. Hulyo 7, 1892, itinatag nina Andres Bonifacio, Valentin Diaz, Teodoro Plata, Ladislao Diwa, Deodato Arellano sa isang bahay sa Azcarraga. Layunin ng Katipunan ay ang Politikal, Moral, Sibiko na may tatlong sanggunian ng KKK na Kataastaasang Sangunian, Sangguniang Bayan at Sangguniang Balangay.",
    "Sunod sunod ang mga labanang nangyari pinangunahan ng Maynila hanggang sa nakipaglaban na rin ang mga karatig lalawigan gaya ng cavite, batangas, bulacan, tarlac, pampanga, laguna at nueva ecija. Ang walong lalawigan na ito na nanguna sa pakikipaglaban sa mga Espanyol  na syang sumisimbolo sa walong sinag ng araw na makikita sa ating watawat.",
    "Ang trianggulong Sistema ay ginagamit sa pagkuha ng mga kasaping katipunero. Ang dating miyembro ay maghahanap ng dalawang bagong miyembro na hindi magkakilala. Sa maikling panahon, lumaki ang samahan ng katpunan.",
    "Ang Katipun ay unang antas ng Katipunero; Password: Anak ng Bayan; Nagsusuot ng itim na may nakasulat na titik Z,B,L, Nangangahulugang Anak ng Bayan. Ang kawal ay ang ikalawang antas ng Katipunero.; Password: GOMBURZA; Nagsusuot ng berdeng pandong sa mga pagpupulong na may titik na Z,B,L nangangahulugang Anak ng Bayan; Ang bayani naman ang ikatatlong antas ng Katipunero; Password: Rizal; Nagsusuot ng pulang hood sa mga pagpupulong. Binubuo ng mga pinuno ng Katipunan.",
    "Ang Ritwal na ginagawa sa mga taong nais na maging kasapi ng Katipunan ay Pacto De Sangre. Ito ay ginagawa sa isang lihim na silid na kung tawagin ay Camara Negra (DARK CHAMBER). Ito ay nagsisimula sa isang pagsubok at nagtatapos sa paglagda sa kasunduan gamit ang sarili nilang dugo.",
    "Ang himagsikan sa Cavite ay nagsimula noong Agosto 31, 1896. Laging panalo sa labanan ang mga caviteno at dahil ditto ay sumikat at naging sentro ng labanan ang lalawigan ng Cavite at ito ay nahahati sa dalawang pangkat. Una ay ang Magdalo Faction na pinamumunuan ni Gen. Baldomero Aguinaldo at ang Magdiwang Faction na pinamumunuan ni Gen. Mariano Alvarez at ang dalawang ito ay hindi nagkasundo sa kanilang pananaw.",
    "Nais ng Magdalo Faction na palitan ang katipunan ng isang pamahalaang rebolusyonaryo na mahigpit namang tinutulan ng magdiwang faction dahil sa paniniwalang ang KKK ay mayroon ng konstitusyon at mga batas.  Disyembre 31, 1896 ay nagkaroon ng isang kumbensyon sa Imus, Cavite upang pagkasunduin ang dalawang grupo ngunit natapos ang pagpupulong ng walang napagkasunduan ang dalwang pangkat."
  ];

  useEffect(() => {
    if (location.state?.showToast && !hasShownToast) {
      toast.info(<div style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
        <img 
          src={star} 
          alt="Star" 
          style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '20px'}} 
        />
        <span style={{width: '180px'}}>Paunang gantimpala sapagkat ikay nakarating dito!</span>
      </div>, 
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }, 1500);
      setHasShownToast(true);
    }
  
    // ... (rest of the useEffect for background image)
  }, [selectedImage, location.state]);

  const handlePrev = (e) => {
    e.preventDefault();
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
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
    navigate('/PugadLawin3d', { state: { showToast: true } });
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
    <div className="PugadLawin">
      <ToastContainer/>
      <button onClick={handleViewMore}>View in 3D</button>
      <div className="PugadLawin-container">
        <div className="PugadLawin-description-container">
          <h1>Description:</h1>
          <p>{descriptions[selectedImage]}</p>
        </div>
        <div className="PugadLawin-image-container">
          {[...Array(3)].map((_, index) => {
            const imageIndex = (selectedImage + index) % images.length;
            return (
              <div
                key={imageIndex}
                className={`PugadLawin-image-wrapper ${index === 0 ? 'selected' : ''} ${
                  isZoomed && index === 0 ? 'zoomed' : ''
                }`}
                onClick={(e) => index === 0 ? toggleZoom(e) : setSelectedImage(imageIndex)}
                style={{
                  order: index,
                  zIndex: 2 - index
                }}
              >
                <img src={images[imageIndex].src} alt={`Image ${imageIndex + 1}`} />
                <div className="PugadLawin-image-description">{images[imageIndex].description}</div>
              </div>
            );
          })}
        </div>
        <div className="PugadLawin-arrow-keys">
          <img src={arrownav2} alt="left" onClick={handlePrev} />
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default PugadLawin;
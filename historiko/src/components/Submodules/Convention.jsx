import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Convention.css';
import star from '../../assets/star.jfif';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import groupphoto from '../../assets/groupphoto.png';
import lastpage from '../../assets/lastpage.png';
import groupphoto2 from '../../assets/groupphoto2.png';
import mtbuntis from '../../assets/mtbuntis.jpg';
import layuninngtejeros from '../../assets/layuninngtejeros.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Convention = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const topicId = 5;
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);
  const [currentHeading, setCurrentHeading] = useState("Unang pangyayari");

  const images = [
    { src: groupphoto, bg: groupphoto },
    { src: lastpage, bg: lastpage, description: "Huling pahina at mga lagda sa Acta De Tejeros mula sa Tradegy of the Revolution" },
    { src: groupphoto2, bg: groupphoto2 },
    { src: mtbuntis, bg: mtbuntis },
    { src: layuninngtejeros, bg: layuninngtejeros },
  ];

  const descriptions = [
    "Hindi nagustuhan ni Andres Bonafacio ang pagtutol at pangiinsulto ni Daniel Tirona, ay kanyang ipinahayag na walang bisa ang naganap na pagpupulong at umalis. Matapos ang paglisan ni bonifacio ay patuloy parin ang halalan at pagpupulong sa tejeros at isinagawa ang panunumpa sa katungkulan ng mga bagong halal na pinuno maliban kay Bonifacio sa simbahan ng Sta Cruz Malabon.",
    "Matapos umalis ni Andres Bonifacio ay nagtungo siya sa Naic, Cavite kasama ang kanyang matatapat na tauhan at ditto ay kanilang ginawa ang isang petisyon na tinawag na  ( Acta De Tejeros ) na nilagdaan na mahigit 40 kasapi ng katipunan. Sa petisyong ito ay kanilang ipinaliwanag kung bakit hindi katanggap tanggap ang naging resulta ng pagpupulong sa Tejeros",
    "Kasunod nito ay bumuo si Andres Bonifacio ng isang hiwalay na pamahalaan sa ilalim ng batas ng ( Kasunduang Militar sa Naic ). Ang pangyayaring ito ay nakarating kay Aguinaldo at agad nyang ipinag-utos kay Koronel Agapito Banzon ang pagdakip kay Bonifacio sa mga kasamahan niya. Nagkaroon ng palitan ng putok ng subukang arestuhin si bonifacio at ang kanyang mga kasamahan na nauwi sa pagdakip kay bonifacio at pagkasawi ng kanyang kapatid na si Ciriaco Bonifacio.",
    "Humarap sa kasong Rebelyon at nahatulan ng kamatayan si Andres Bonafacio, siya ay ipinahuli at ipinapatay ni Aguinaldo sa kanyang mga tauhan. Iniutos kay Mariano Noriel na ibigay ang hatol sa isang selyadong sobre kay Lazaro Makapagal. Iniutos ang pagbaril kay Bonifacio kasama ang kanyang kapatid na lalaking si Procopio Bonifacio noong 10 Mayo 1897 malapit sa Bundok Nagpatong (o Bundok Buntis). Sunod sunod ang mga labanan sa pagitan ng mga Pilipino at espanyol pagkatapos ng unang sigaw sa pugad lawin. Kasabay nito ang sunod sunod din na pagkatalo sa ibat ibang lugar sa bansa kabilang ang grupo ni Emilio Aguinaldo sa cavite, dahil dito ay umatras at nagtungo sa Talisay Batangas. Kalaunan ay nagtungo sa San Miguel, Bulacan upang iwasan ang malaking grupo ng mga espanyol as tumutugis sa kanila.",
    "Ang layunin ng Kumbensiyon sa Tejeros ay upang ayusin ang hindi pagkakaunawaan sa pagitan ng dalwang pangkat ng Katipunan sa Cavite at upang bumuo ng isang rebolusyunaryong pamahalaan. Ngunit, sa hali na magkaisa ay lalo pang tumindi ang hidaan at humantong sa pagakamat ni Andres Bonifacio.",
  ];

  const headings = [
    "Unang pangyayari",
    "Ika-pangalawang pangyayari",
    "Ika-tatlong pangyayari",
    "Ika-apat na pangyayari",
    "Ika-limang pangyayari",
  ];

  useEffect(() => {
    if (!localStorage.getItem('hasViewedconvention3D') === null) {
      localStorage.setItem('hasViewedconvention3D', 'false');
    }
  }, []);

  useEffect(() => {
    if (user && localStorage.getItem('hasViewedconvention3D') === 'false' && !hasShownToast) {
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
    localStorage.setItem('hasViewedconvention3D', 'true');
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
    navigate('/Convention3d', { state: { showToast: true } });
  };

  const handleHeadingClick = (index) => {
    setSelectedImage(index);
    setCurrentHeading(headings[index]);
  };

  return (
    <div className="convention">
      <ToastContainer/>
      <button onClick={handleViewMore} className="view">View in 3D</button>
      <div className="convention-container">
        <div className="convention-description-container">
          <h1>Deskripsyon:</h1>
          <h2>{currentHeading}</h2>
          <p>{descriptions[selectedImage]}</p>
        </div>
        <div className="convention-image-container">
          {[...Array(3)].map((_, index) => {
            const imageIndex = (selectedImage + index) % images.length;
            return (
              <div
                key={imageIndex}
                className={`convention-image-wrapper ${index === 0 ? 'selected' : ''} ${
                  isZoomed && index === 0 ? 'zoomed' : ''
                }`}
                onClick={(e) => index === 0 ? toggleZoom(e) : setSelectedImage(imageIndex)}
                style={{
                  order: index,
                  zIndex: 2 - index
                }}
              >
                <img src={images[imageIndex].src} alt={`Image ${imageIndex + 1}`} />
                <div className="convention-image-description">{images[imageIndex].description}</div>
              </div>
            );
          })}
        </div>
        <div className="convention-arrow-keys">
          <img src={arrownav2} alt="left" onClick={handlePrev} />
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        </div>
      </div>
      <div className="convention-headings">
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

export default Convention;
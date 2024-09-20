import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Tirad.css';
import kidst from '../../assets/kidst.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import star from '../../assets/star.jfif';
import pasongtirad from '../../assets/pasongtirad.png';
import gregdelpillar from '../../assets/gregdelpillar.png';
import januario from '../../assets/januario.png';
import genfriedrich from '../../assets/genfriedrich.png';
import bg6 from '../../assets/kidst.png';
import bg7 from '../../assets/kidst.png';
import bg8 from '../../assets/kidst.png';
import bg9 from '../../assets/kidst.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tirad = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const topicId = 2;
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);

  const images = [
    { src: pasongtirad, bg: pasongtirad, description: "Pasong Tirad Pass, Ilocos Sur" },
    { src: gregdelpillar, bg: gregdelpillar, description: "Gregorio Del Pilar" },
    { src: januario, bg: januario, description: "Januario Galut" },
    { src: genfriedrich, bg: genfriedrich, description: "General Friedrich Funston" },
    { src: kidst, bg: bg6, description: "Macario Sakay" },
    { src: kidst, bg: bg7, description: "Miguel Malvar" },
    { src: kidst, bg: bg8, description: "Vicente Lukban" },
    { src: kidst, bg: bg9, description: "Simeon Ola" },
  ];

  const descriptions = [
    "Ang Pasong Tirad ay isang makitid at istratehikong lagusan sa kabundukan ng Tirad na bahagi ng kabundukan ng bayan ng Concepcion, Ilocos Sur  na Gregorio del Pilar ngayon, sa may kanlurang bahagi ng Cordillera. Sa pasong tirad ay humimpil ang batang Heneral na si Gregorio del Pilar kasama ang 60 sundalo upang hadlangan ang 300 amerikanong sundalo na tumutugis kay Aguinaldo. ",
    "Si Gregorio Del Pilar ay isang batang heneral na tinaguriang bayani ng pasong tirad na nagpamalas ng tapang, kagitingan at pagmamahal sa bayan. Minarapat nyang magpaiwan upang magkaroon ng sapat na oras si Emilio Aguinaldo upang makalayo at makarating sa Palanan, Isabela.",
    "Nahirapan ang mga amerikano na magapi si Del Pilar sapagkat mataas ang kanilang kinalalagyan. Sa kasamaang palad ay tinulungan ang mga amerikano ng isang Igorot na nagngangalang Januario Galut na may kaalaman sa topograpiya ng lugar at itinuro nito ang kinaroroonan ni Del Pilar at natagpuan ng mga amerikano si Del PIlar noong Disyembre 2, 1899 at matapos nitoy walang tigil na putukan ang naganap at nasawi si Del Pilar kasama ang 60 nyang tauhan.  Siya ay nasawi sa 24 na taong gulang.",
    "Marso 23, 1901, nadakip si Aguinaldo ng mga amerikano sa pangunguna ni General Friedrich Funston at sa tulong na rin ng ilang Pilipino mula sa Macabebe Scout sa pamumuno ni Tal Placido at Lazaro Segovia. Noong Abril 1, 1901, Nanumpa si Aguinaldo ng katapatan sa Estados Unidos at hinimok niya ang mga Pilipino na tanggapin na ang kapangyarihan ng mga amerikano.",
    "Ngunit ang pagsuko ni Aguinaldo ay hindi nangangahulugan ng pagwawakas ng Himagsikan. Marami paring Pilipino ang nagpatuloy sa pakikipaglaban tulad nina Macario Sakay   nang Cordillera at ni Miguel Malvar nang Batangas, Vicente Lukban nang samar at ang huling heneral na sumuko sa mga amerikano na si Simeon Ola nang Albay.",
    "Ngunit ang pagsuko ni Aguinaldo ay hindi nangangahulugan ng pagwawakas ng Himagsikan. Marami paring Pilipino ang nagpatuloy sa pakikipaglaban tulad nina Macario Sakay   nang Cordillera at ni Miguel Malvar nang Batangas, Vicente Lukban nang samar at ang huling heneral na sumuko sa mga amerikano na si Simeon Ola nang Albay.",
    "Ngunit ang pagsuko ni Aguinaldo ay hindi nangangahulugan ng pagwawakas ng Himagsikan. Marami paring Pilipino ang nagpatuloy sa pakikipaglaban tulad nina Macario Sakay   nang Cordillera at ni Miguel Malvar nang Batangas, Vicente Lukban nang samar at ang huling heneral na sumuko sa mga amerikano na si Simeon Ola nang Albay.",
    "Ngunit ang pagsuko ni Aguinaldo ay hindi nangangahulugan ng pagwawakas ng Himagsikan. Marami paring Pilipino ang nagpatuloy sa pakikipaglaban tulad nina Macario Sakay   nang Cordillera at ni Miguel Malvar nang Batangas, Vicente Lukban nang samar at ang huling heneral na sumuko sa mga amerikano na si Simeon Ola nang Albay.",
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
    navigate('/Tirad3d', { state: { showToast: true } });
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
    <div className="tirad">
      <ToastContainer/>
      <button onClick={handleViewMore}>View in 3D</button>
      <div className="tirad-container">
        <div className="tirad-description-container">
          <h1>Description:</h1>
          <p>{descriptions[selectedImage]}</p>
        </div>
        <div className="tirad-image-container">
          {[...Array(3)].map((_, index) => {
            const imageIndex = (selectedImage + index) % images.length;
            return (
              <div
                key={imageIndex}
                className={`tirad-image-wrapper ${index === 0 ? 'selected' : ''} ${
                  isZoomed && index === 0 ? 'zoomed' : ''
                }`}
                onClick={(e) => index === 0 ? toggleZoom(e) : setSelectedImage(imageIndex)}
                style={{
                  order: index,
                  zIndex: 2 - index
                }}
              >
                <img src={images[imageIndex].src} alt={`Image ${imageIndex + 1}`} />
                <div className="tirad-image-description">{images[imageIndex].description}</div>
              </div>
            );
          })}
        </div>
        <div className="tirad-arrow-keys">
          <img src={arrownav2} alt="left" onClick={handlePrev} />
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Tirad;
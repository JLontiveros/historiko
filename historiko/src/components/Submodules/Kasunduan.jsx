import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Kasunduan.css';
import kidst from '../../assets/kidst.png';
import star from '../../assets/star.jfif';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import groupnabiak from '../../assets/groupnabiak.png';
import republikangbiak from '../../assets/republikangbiak.jpg';
import trio from '../../assets/trio.png';
import barkonguranus from '../../assets/barkonguranus.png';
import nota from '../../assets/nota.png';
import classpic from '../../assets/classpic.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Kasunduan = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const topicId = 6;
  const location = useLocation();

  const images = [
    { src: republikangbiak, bg: republikangbiak },
    { src: trio, bg: trio },
    { src: barkonguranus, bg: barkonguranus, description: "Barkong Uranus" },
    { src: kidst, bg: kidst },
    { src: nota, bg: nota },
    { src: classpic, bg: classpic },
  ];

  const descriptions = [
    "Naitatag ang republika ng biak na bato matapos mapagtibay ang isang saligang batas at ang mga tumayong pinuno nito ay nakasaad sa litrato. Tumagal lamang ng ilang buwan ang Republika ng biak na bato dahil noong Disyembre 15, 1897 at nagpatawag ng negosasyon si Gob-Hen Primo De Rivera sa pangkat ni Aguinaldo.",
    "Si Pedro Paterno, isang Kastila na ipinanganak sa Pilipinas, ay boluntaryong naging tagapamagitan sa pagitan nina Aguinaldo at Gobernador Primo de Rivera upang matapos ang mga labanan. Noong Disyembre 15, 1897, nilagdaan ni Paterno ang Kasunduan ng Biak-na-Bato bilang kinatawan ng mga rebolusyonaryo, at si de Rivera bilang kinatawan ng pamahalaang Espanyol. Ang mga pinuno ng pamahalaan na itinatag sa ilalim ng kasunduan ay sina: Emilio Aguinaldo bilang Pangulo, Mariano Trias bilang Bise-Pangulo, Antonio Montenegro bilang Kalihim, Baldomero Aguinaldo bilang Ingat-yaman, at Emilio Riego de Dios.",
    "Noong Disyembre 23, 1897, dumating sina Heneral Celestino Tejero at Ricardo Monet mula sa hukbong Espanyol sa Biak-na-Bato at naging mga bihag ng mga rebelde. Nagdeklara ng tigil-putukan ang magkabilang panig at nagkaroon ng kasunduan sa pagitan ni Aguinaldo at ng mga puwersang Espanyol: na ang pamahalaang Espanyol ay magbibigay ng sariling pamamahala sa Pilipinas sa loob ng tatlong taon kung aalis si Aguinaldo at isusuko ang kanyang mga armas. Bilang kapalit, makakatanggap si Aguinaldo ng P800,000 (Mexican Pesos) bilang kabayaran sa mga rebolusyonaryo at isang amnestiya. Pagkatapos makatanggap ng kalahating bayad na P400,000, umalis si Aguinaldo sakay ng barkong Uranus patungong Hong Kong noong Disyembre 27, 1897.",
    "Pagkabigo ng Kasunduan ng Biak-na-Bato; Gayunpaman, may ilang mga heneral ng Pilipinas ang hindi naniwala sa sinseridad ng mga Kastila at tumangging isuko ang kanilang mga armas. Sa kabila nito, nagdaos pa rin ng Te Deum noong Enero 23, 1898. Ang Te Deum—isang tradisyunal na Kristiyanong himno ng pasasalamat at papuri sa Katedral ng Maynila at Palacio Real sa Madrid bilang simbolo ng kapayapaan, ang mga pagkukulang at hindi pagtupad sa mga kondisyon ng kasunduan ay nagdulot ng higit pang tensyon at hindi pagkakaintindihan.",
    "Nilagdaan ang isang kasulatan: 1. Pagbabayad ng 800,000 pesos (MEXICAN) sa mga sundalo; A. MXN P400,000 kapalit ng pag-alis ni Aguinaldo patungo sa hongkong; B. 200,000 pesos (MEXICAN) kapalit ng mga armas na lalagpas sa 700 piraso; C. 200,000 pesos (MEXICAN) kapag ang Te Deum (isang tradisyunal na Kristiyanong himno ng papuri at pasasalamat) ay inawit at ang pangkalahatang amnestiya ay iproklama ng Gobernador Heneral; 2.. Pagbibigay ng MXN P900,000 para sa mga sibilyang nadamay sa labanan.",
    "Hindi nagtitiwala sa isa't isa ang mga Pilipino at mga Kastila. Dahil dito, patuloy na nagkaroon ng mga labanan sa pagitan ng dalawang panig kahit na umalis na si Aguinaldo mula sa bansa. Hindi ibinigay ng mga Kastila ang buong napagkasunduang halaga. Ang mga pangyayaring ito ay nagpatuloy sa Digmaang Espanyol-Amerikano."
  ];

  useEffect(() => {
    if (location.state?.showToast) {
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
    }
  
    // ... (rest of the useEffect for background image)
  }, [selectedImage, location.state]);

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
    navigate('/Kasunduan3d', { state: { showToast: true } });
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
    <div className="Kasunduan">
      <ToastContainer/>
      <button onClick={handleViewMore}>View in 3D</button>
      <div className="Kasunduan-container">
        <div className="Kasunduan-description-container">
          <h1>Description:</h1>
          <p>{descriptions[selectedImage]}</p>
        </div>
        <div className="Kasunduan-image-container">
          {[...Array(3)].map((_, index) => {
            const imageIndex = (selectedImage + index) % images.length;
            return (
              <div
                key={imageIndex}
                className={`Kasunduan-image-wrapper ${index === 0 ? 'selected' : ''} ${
                  isZoomed && index === 0 ? 'zoomed' : ''
                }`}
                onClick={index === 0 ? toggleZoom : () => setSelectedImage(imageIndex)}
                style={{
                  order: index,
                  zIndex: 2 - index
                }}
              >
                <img src={images[imageIndex].src} alt={`Image ${imageIndex + 1}`} />
                <div className="Kasunduan-image-description">{images[imageIndex].description}</div>
              </div>
            );
          })}
        </div>
        <div className="Kasunduan-arrow-keys">
          <img src={arrownav2} alt="left" onClick={handlePrev} />
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Kasunduan;
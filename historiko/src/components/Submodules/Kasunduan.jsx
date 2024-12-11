import React, { useState, useEffect } from 'react';
import ChatBox from '../Chat/ChatBot';
import { useNavigate, useLocation } from 'react-router-dom';
import './Kasunduan.css';
import kidst from '../../assets/kidst.png';
import star from '../../assets/star.jfif';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import statue from '../../assets/statue.png';
import groupnabiak from '../../assets/groupnabiak.png';
import republikangbiak from '../../assets/republikangbiak.jpg';
import trio from '../../assets/trio.png';
import Swal from 'sweetalert2';
import nilagdaan from '../../assets/nilagdaan.png';
import barkonguranus from '../../assets/barkonguranus.png';
import kasunduanp1 from '../../assets/kasunduanp1.png';
import kasunduanp2 from '../../assets/kasunduanp2.png';
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
  const [hasShownToast, setHasShownToast] = useState(false);
  const [currentHeading, setCurrentHeading] = useState("Unang pangyayari");

  const images = [
    { src: kasunduanp1, bg: kasunduanp1 , description: "Pagtatag ng Pansamantalang Pamahalaan sa Biak-na-Bato" },
    { src: statue, bg: statue },
    { src: kasunduanp2, bg: kasunduanp2, description: "Paglikas ng Mga Sibilyan sa Biak-na-Bato" },
    { src: groupnabiak, bg: groupnabiak },
    { src: republikangbiak, bg: republikangbiak },
    { src: trio, bg: trio },
    { src: nilagdaan, bg: nilagdaan },
    { src: barkonguranus, bg: barkonguranus, description: "Barkong Uranus" },
    { src: nota, bg: nota , description: "Pagkabigo ng Kasunduan ng Biak-na-Bato"},
    { src: classpic, bg: classpic , description: "Pagkabigo ng Kasunduan ng Biak-na-Bato"},
  ];

  const descriptions = [
    "Sa panahon ng negosasyon, itinatag ni Emilio Aguinaldo ang isang pansamantalang pamahalaan sa Biak-na-Bato na may layuning magkaroon ng kontrol sa mga rebolusyonaryo at magbigay ng organisasyon sa kanilang kilusan habang naghihintay ng resulta ng kasunduan.",
    "Hindi rin tumupad ang mga Pilipino sa kasunduan. Inihanda ni Aguinaldo ang salaping tinanggap para gamitin sa iba pang pakikipaglaban sa mga Espanyol. Maraming kawal na Pilipino ang hindi nagsuko ng kanilang mga sandata. Samantala, nagpatuloy ang labanan sa Zambales, Ilocos Sur, Manila, Cebu, Bohol, Panay at sa ibang panig na lugar sa Mindanao.",
    "Dahil sa patuloy na labanan bago ang tigil-putukan, maraming sibilyan ang napilitang lumikas sa Biak-na-Bato upang makahanap ng kanlungan. Naging ligtas na lugar ang Biak-na-Bato para sa mga rebolusyonaryo at sibilyan na tumatakas mula sa mga Espanyol.",
    "Patuloy na pinulong ni Emilio Aguinaldo ang mga pinuno ng hukbo upang bumuo ng Saligang Batas. Noong Nobyembre 1, 1897 ay nabuo ang Konstitusyon ng Biak -na-Bato na isinulat nila Isabelo Artacho, at Feliz Ferrer na isinulat sa Biak-na-Bato sa Bulacan na sinasabing ibinase sa Saligang Batas ng bansang Cuba sa Jimaguayú. Ang Biak na Bato ay nagbigay para sa paglikha ng kataas-taasang konseho pati na rin ang karapatang pang tao kasama ang kalayaan, relihiyon, at edukasyon. Nagwakas ang katipunan at napalitan ng isang pamahalaan na may konstitusyong sinusunod. Nawala man ang samahang KKK ngunit ang mga kasapi nito ay patuloy pa ring nakipaglaban sa mga Espanyol.",
    "Naitatag ang Republika ng Biak-na-Bato matapos mapagtibay ang isang Saligang Batas at ang mga tumayong pinuno nito ay nakasaad sa litrato. Tumagal lamang ng ilang buwan ang Republika ng Biak-na-Bato dahil noong Disyembre 15, 1897 at nag patawag ng negosasyon si Gob-Hen Primo De Rivera sa pangkat ni Aguinaldo.",
    "Si Pedro Paterno, isang Kastila na ipinanganak sa Pilipinas, ay boluntaryong naging tagapamagitan sa pagitan nina Aguinaldo at Gobernador Primo de Rivera upang matapos ang mga labanan. Noong Disyembre 15, 1897, nilagdaan ni Paterno ang Kasunduan ng Biak-na-Bato bilang kinatawan ng mga rebolusyonaryo, at si de Rivera bilang kinatawan ng pamahalaang Espanyol. Ang mga pinuno ng pamahalaan na itinatag sa ilalim ng kasunduan ay sina: Emilio Aguinaldo bilang Pangulo, Mariano Trias bilang Bise-Pangulo, Antonio Montenegro bilang Kalihim, Baldomero Aguinaldo bilang Ingat-yaman, at Emilio Riego de Dios.",
    "Nilagdaan ang isang kasulatan: 1. Pagbabayad ng 800,000 Mexican Pesos sa mga sundalo A.	MXN P400,000 kapalit ng pag-alis ni Aguinaldo patungo sa Hong Kong B.	200,000 Mexican Pesos kapalit ng mga armas na lalagpas sa 700 piraso C.	200,000 Mexican Pesos kapag ang Te Deum (isang tradisyunal na Kristiyanong himno ng papuri at pasasalamat) ay inawit at ang pangkalahatang amnestiya ay iproklama ng Gobernador Heneral. 2. Pagbibigay ng MXN P900,000 para sa mga sibilyang nadamay sa labanan.",
    "Noong Disyembre 23, 1897, dumating sina Heneral Celestino Tejero at Ricardo Monet mula sa hukbong Espanyol sa Biak-na-Bato at naging mga bihag ng mga rebelde. Nagdeklara ng tigil-putukan ang magkabilang panig at nagkaroon ng kasunduan sa pagitan ni Aguinaldo at ng mga puwersang Espanyol: na ang pamahalaang Espanyol ay magbibigay ng sariling pamamahala sa Pilipinas sa loob ng tatlong taon kung aalis si Aguinaldo at isusuko ang kanyang mga armas. Bilang kapalit, makakatanggap si Aguinaldo ng P800,000 (Mexican Pesos) bilang kabayaran sa mga rebolusyonaryo at isang amnestiya. Pagkatapos makatanggap ng kalahating bayad na P400,000, umalis si Aguinaldo sakay ng barkong Uranus patungong Hong Kong noong Disyembre 27, 1897.",
    "Gayunpaman, may ilang mga heneral ng Pilipinas ang hindi naniwala sa sinseridad ng mga Kastila at tumangging isuko ang kanilang mga armas. Sa kabila nito, nagdaos pa rin ng Te Deum noong Enero 23, 1898. Ang Te Deum—isang tradisyunal na Kristiyanong himno ng pasasalamat at papuri sa Katedral ng Maynila at Palacio Real sa Madrid bilang simbolo ng kapayapaan, ang mga pagkukulang at hindi pagtupad sa mga kondisyon ng kasunduan ay nagdulot ng higit pang tensyon at hindi pagkakaintindihan.",
    "Hindi nagtitiwala sa isa't isa ang mga Pilipino at mga Kastila. Dahil dito, patuloy na nagkaroon ng mga labanan sa pagitan ng dalawang panig kahit na umalis na si Aguinaldo mula sa bansa. Hindi ibinigay ng mga Kastila ang buong napagkasunduang halaga. Ang mga pangyayaring ito ay nagpatuloy sa Digmaang Espanyol-Amerikano."
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
    "Ika-siyam na Pangyayari",
    "Ika-sampung Pangyayari",
  ];

  useEffect(() => {
    if (!localStorage.getItem('hasViewedkasunduan3D') === null) {
      localStorage.setItem('hasViewedkasunduan3D', 'false');
    }
  }, []);

  useEffect(() => {
    if (user && localStorage.getItem('hasViewedkasunduan3D') === 'false' && !hasShownToast) {
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

  const progressPercentage = ((selectedImage + 1) / images.length) * 100;
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
  if (selectedImage === 9) {
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
        window.location.href = '/kasunduan';
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
    localStorage.setItem('hasViewedkasunduan3D', 'true');
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

  const handleHeadingClick = (index) => {
    setSelectedImage(index);
    setCurrentHeading(headings[index]);
  };



  return (
    <div className="Kasunduan">
      <ToastContainer/>
      <button onClick={handleViewMore} className="viewkasunduan">View in Video</button>
      <div className="Kasunduan-container">
        <div className="Kasunduan-description-container">
          <h1>Deskripsyon:</h1>
          <h2>{currentHeading}</h2>
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
                onClick={(e) => index === 0 ? toggleZoom(e) : setSelectedImage(imageIndex)}
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
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="kasunduan-arrow-keys">
          <img src={arrownav2} alt="left" onClick={handlePrev} />
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        </div>
      </div>
      <div className="Kasunduan-headings">
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

export default Kasunduan;
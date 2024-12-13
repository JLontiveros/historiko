import React, { useState, useEffect } from 'react';
import ChatBox from '../Chat/ChatBot';
import { useNavigate, useLocation } from 'react-router-dom';
import './PugadLawin.css';
import kidst from '../../assets/kidst.png';
import star from '../../assets/star.jfif';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import andresboni from '../../assets/andresboni.png';
import melchora from '../../assets/melchora.png';
import mariano from '../../assets/mariano.png';
import taxreceipt from '../../assets/taxreceipt.jpg';
import deodato from '../../assets/deodato.png';
import watawat from '../../assets/watawat.png';
import trianggulo from '../../assets/trianggulo.png';
import katipunan from '../../assets/katipunan.png';
import pactodesangre from '../../assets/pactodesangre.png';
import baldoandfrends from '../../assets/baldoandfrends.png';
import magdalo from '../../assets/magdalo.png';
import magdiwang from '../../assets/magdiwang.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const PugadLawin = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const topicId = 4;
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);
  const [currentHeading, setCurrentHeading] = useState("Unang pangyayari");

  const images = [
    { src: andresboni, bg: andresboni, description: "Andres Bonifacio" },
    { src: melchora, bg: melchora, description: "Melchora Aquino" },
    { src: trianggulo, bg: trianggulo, description: "Trianggulong Sistema" },
    { src: katipunan, bg: katipunan, description: "Mga kasapi ng katipunan" },
    { src: pactodesangre, bg: pactodesangre, description: "Pacto De Sangre" },
    { src: mariano, bg: mariano, description: "Pacto Mariano Gil" },
    { src: taxreceipt, bg: taxreceipt, description: "Tax Receipt Torn by Members of the Katipunan" },
    { src: watawat, bg: watawat, description: "Watawat" },
    { src: baldoandfrends, bg: baldoandfrends, description: "Heneral Mariano Alvarez" },
    { src: magdalo, bg: magdalo, description: "Magdalo at Magdiwang Faction" },
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

  const descriptions = [
    "Maraming sumuporta kay Andres Bonifacio dahil mahusay siyang lider. Nagkasundo sila na ipagpatuloy ang paghihimagsik. Siya ay binansagang Ama ng Katipunan. Siya ang nagtatag at lumaon naging Supremo ng kilusang Katipunan na naglayong makamtan ang kasarinlan ng Pilipinas mula sa Espanya at nagpasimula ng Himagsikang Pilipino.",
    "Dahil sa patagong pagpupulong at pag-iwas sa mga Espanyol, ang mga katipunero ay tumutungo sa bahay ni Melchora Aquino, tinaguriang si “Tandang Sora”, “Ina ng Balintawak”, “Ina ng Katipunan” at tinawag din siya sa na “Ina ng Rebolusyon”. Hanggang sa sumiklab ang himagsikan, siya ang nanggamot sa mga sugatang katipunero.",
    "Ang trianggulong Sistema ay ginagamit sa pagkuha ng mga kasaping katipunero. Ang dating miyembro ay maghahanap ng dalawang bagong miyembro na hindi magkakilala. Sa maikling panahon, lumaki ang samahan ng katpunan.",
    "Ang Katipun ay unang antas ng Katipunero; Password: Anak ng Bayan; Nagsusuot ng itim na may nakasulat na titik Z,B,L, Nangangahulugang Anak ng Bayan. Ang kawal ay ang ikalawang antas ng Katipunero.; Password: GOMBURZA; Nagsusuot ng berdeng pandong sa mga pagpupulong na may titik na Z,B,L nangangahulugang Anak ng Bayan; Ang bayani naman ang ikatatlong antas ng Katipunero; Password: Rizal; Nagsusuot ng pulang hood sa mga pagpupulong. Binubuo ng mga pinuno ng Katipunan.",
    "Ang Ritwal na ginagawa sa mga taong nais na maging kasapi ng Katipunan ay Pacto De Sangre. Ito ay ginagawa sa isang lihim na silid na kung tawagin ay Camara Negra (DARK CHAMBER). Ito ay nagsisimula sa isang pagsubok at nagtatapos sa paglagda sa kasunduan gamit ang sarili nilang dugo.",
    "Gabi ng August 19, 1896, habang abala ang mga katipunero sa paghahanda ng rebolusyon, isiniwalat ni Teodoro Patino, isang katipunero, kay Padre Mariano Gil ang lihim ng Katipunan. Nagawa niya iyon dahil sa payo ng isang madre at kapatid niyang nakatira sa tahanan ng mga ulila sa Mandaluyong. Itinuro ni Patino ang mga imprenta ng mga katipunero. Natuklasan dito ang ilang polyeto at dokumento ng Katipunan. Hinuli at ikinulong sa Fort Santiago ang mga pinaghihinalaang Pilipino na kasapi ng Katipunan.",
    "Ang pagkatuklas ng Katipunan ay nagbunsod kay Bonifacio na tumawag ng pulong sa Balintawak, Caloocan kasama sina Jacinto, Procopio Bonifacio, at iba pang katipunero. Agosto 23, 1896 ay nagkita-kita ang mga katipunero sa Pugad Lawin. Sa utos ni Bonifacio ay sabay sabay na inilabas ng mga katipunero ang kanilang mga sedula at pinunit ito ng buong pagmamalaki na may katapangan at isinigaw ang mga katagang “Mabuhay ang Pilipinas, Mabuhay ang Kalayaan. Mabuhay! Mabuhay!” at ito ay kinilala sa ating kasaysayan bilang unang sigaw sa Pugad Lawin.",
    "Sunod sunod ang mga labanang nangyari, pinangunahan ng Maynila hanggang sa nakipaglaban na rin ang mga karatig lalawigan gaya ng Cavite, Batangas, Bulacan, Tarlac, Pampanga, Laguna at Nueva Ecija. Ang walong lalawigan na ito na nanguna sa pakikipaglaban sa mga Espanyol  na syang sumisimbolo sa walong sinag ng araw na makikita sa ating watawat. Lalo itong nagpalubha ng labanan ng Espanyol at mga Pilipino. Sa gitna nito ay may namuong alitan laban sa pinuno ng katipunan na si Andres Bonifacio at Heneral Emilio Aguinaldo, dahil sa alitang ito, nagpatawag ng pulong ang mga rebolusyunaryo upang palitan ang Katipunan ng Rebolusyonaryong Pamahalaan.",
    "Ang himagsikan sa Cavite ay nagsimula noong Agosto 31, 1896. Laging panalo sa labanan ang mga Caviteno at dahil dito ay sumikat at naging sentro ng labanan ang lalawigan ng Cavite at ito ay nahahati sa dalawang pangkat. Una ay ang Magdalo Faction na pinamumunuan ni Heneral Baldomero Aguinaldo at ang Magdiwang Faction na pinamumunuan ni Heneral Mariano Alvarez at ang dalawang ito ay hindi nagkasundo sa kanilang pananaw.",
    "Nais ng Magdalo Faction na palitan ang katipunan ng isang pamahalaang rebolusyonaryo na mahigpit namang tinutulan ng Magdiwang Faction dahil sa paniniwalang ang KKK ay mayroon ng konstitusyon at mga batas.  Disyembre 31, 1896 ay nagkaroon ng isang kumbensyon sa Imus, Cavite upang pagkasunduin ang dalawang grupo ngunit natapos ang pagpupulong ng walang napagkasunduan ang dalwang pangkat."
  ];

  useEffect(() => {
    if (!localStorage.getItem('hasViewedpugadlawin3D') === null) {
      localStorage.setItem('hasViewedpugadlawin3D', 'false');
    }
  }, []);

  useEffect(() => {
    if (user && localStorage.getItem('hasViewedpugadlawin3D') === 'false' && !hasShownToast) {
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
  
  const handleNext = async (e) => {
  e.preventDefault();
  if (selectedImage === 9) {
    Swal.fire({
      title: 'Mahusay!',
      text: " Nais mo bang magpatuloy sa susunod na talakayin?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Magpatuloy',
      cancelButtonText: 'Manatili'
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to the "kasunduan" link if confirmed
        window.location.href = '/convention';
      }
    });
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
    localStorage.setItem('hasViewedpugadlawin3D', 'true');
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

  const handleHeadingClick = (index) => {
    setSelectedImage(index);
    setCurrentHeading(headings[index]);
  };

  const progressPercentage = ((selectedImage + 1) / images.length) * 100;


  return (
    <div className="PugadLawin">
      <ToastContainer/>
      <button onClick={handleViewMore} className="viewpugad">View in Video</button>
      <div className="PugadLawin-container">
        <div className="PugadLawin-description-container">
          <h1>Deskripsyon:</h1>
          <h2>{currentHeading}</h2>
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
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="pugadlawin-arrow-keys">
          <img src={arrownav2} alt="left" onClick={handlePrev} />
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        </div>
      </div>
      <div className="PugadLawin-headings">
        {headings.map((heading, index) => (
          <button
            key={index}
            className={`heading-button ${index === selectedImage ? 'active' : ''}`}
            onClick={() => handleHeadingClick(index)}
          ></button>
        ))}
      </div>
    <ChatBox /> 
</div>
  );       


};

export default PugadLawin;
import React, { useState, useEffect } from 'react';
import ChatBox from '../Chat/ChatBot';
import { useNavigate, useLocation } from 'react-router-dom';
import './Convention.css';
import star from '../../assets/star.jfif';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import groupphoto from '../../assets/groupphoto.png';
import lastpage from '../../assets/lastpage.png';
import groupphoto2 from '../../assets/groupphoto2.png';
import mtbuntis from '../../assets/mtbuntis.jpg';
import tejeros1 from '../../assets/tejeros1.png';
import tejerosp2 from '../../assets/tejerosp2.png';
import tejerosp3 from '../../assets/tejerosp3.png';
import tejerosp4 from '../../assets/tejerosp4.png';
import tejerosp5 from '../../assets/tejerosp5.png';
import tejerosp6 from '../../assets/tejerosp6.png';
import tejerosp7 from '../../assets/tejerosp7.png';
import layuninngtejeros from '../../assets/layuninngtejeros.png';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

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
    { src: tejeros1, bg: tejeros1 , description: "Ang Liham ni Andres Bonifacio kay Emilio Aguinaldo" },
    { src: tejerosp2, bg: tejerosp2 , description: "Simula ng Kumbensyon" },
    { src: tejerosp3, bg: tejerosp3 , description: "Pagiging Bias ng Kumbensiyon" },
    { src: tejerosp4, bg: tejerosp4 , description: "Pagpapahayag ni Bonifacio ng Kanyang Karapatan bilang Supremo" },
    { src: tejerosp5, bg: tejerosp5 , description: "Pagsiklab ng Lalong Matinding Hidwaan" },
    { src: tejerosp6, bg: tejerosp6  , description: "Pagsira ng Orihinal na Layunin ng Kumbensiyon"},
    { src: tejerosp7, bg: tejerosp7  , description: "Mga Pagbabanta sa Seguridad ng Katipunan"},
    { src: groupphoto, bg: groupphoto },
    { src: lastpage, bg: lastpage, description: "Huling pahina at mga lagda sa Acta De Tejeros mula sa Tradegy of the Revolution" },
    { src: groupphoto2, bg: groupphoto2 },
    { src: mtbuntis, bg: mtbuntis },
    { src: layuninngtejeros, bg: layuninngtejeros },
  ];

  const descriptions = [
    "Bago ang pagpupulong sa Tejeros, nagpadala si Bonifacio ng liham kay Aguinaldo upang ipanukala ang isang mas maayos na proseso ng eleksyon. Gayunpaman, hindi ito napagtuunan ng pansin dahil sa tensyon sa pagitan ng Magdalo at Magdiwang. Ang hindi pagkakaintindihan sa panig ng dalawang pangkat ay nagbigay-daan sa isang masalimuot na proseso ng pagpupulong.",
    "Noong Marso 22, 1897, ang Kumbensiyon sa Tejeros ay pormal na nagsimula sa Casa Hacienda sa San Francisco de Malabon (ngayon ay General Trias). Si Jacinto Lumbreras ang namuno sa pulong, habang si Andres Bonifacio ay nagbigay-diin sa kahalagahan ng pagkakaisa upang malabanan ang Espanya. Sa kabila ng kanyang pahayag, naramdaman na agad ang tensyon sa pagitan ng dalawang pangkat",
    "Ang eleksyon ay nagbigay ng mas mataas na tsansa para sa Magdalo dahil karamihan ng mga dumalo ay taga-Cavite, na kinokontrol ng Magdalo. Ang kawalan ng representasyon mula sa ibang bahagi ng Katipunan, lalo na mula sa Maynila at mga karatig-lalawigan, ay naging isa sa mga pangunahing isyu sa proseso ng eleksyon.",
    "Matapos ang pagtutol ni Daniel Tirona sa eleksyon ni Bonifacio bilang Direktor ng Interyor, ipinahayag ni Bonifacio na siya, bilang Supremo ng Katipunan, ay may kapangyarihan na ipawalang-bisa ang anumang desisyon na hindi sumusunod sa tamang proseso. Ito ang dahilan kung bakit idineklara niyang walang bisa ang resulta ng eleksyon.",
    "Ang hindi pagkakaintindihan sa Tejeros ay nagpalala ng tensyon sa pagitan ng Magdalo at Magdiwang. Ang hidwaang ito ay naging sanhi ng pagkawatak-watak ng mga Katipunero sa Cavite at nagdulot ng kahinaan sa kanilang kolektibong laban sa Espanyol.",
    "Ang orihinal na layunin ng kumbensiyon ay pagkakaisa at pagpapabuti ng estratehiya laban sa Espanyol. Subalit, ang halalan ay naging personalan, at ang agendang politikal ng bawat pangkat ay nanaig kaysa sa interes ng buong rebolusyon.",
    "Kasabay ng mga tensyon sa loob ng Katipunan, pinalakas ng mga Espanyol ang kanilang kampanya upang durugin ang mga rebolusyonaryo sa Cavite. Ang panloob na alitan sa pagitan ng Magdalo at Magdiwang ay nagbigay ng oportunidad sa mga Espanyol na palakasin ang kanilang kontrol sa rehiyon.",
    "Hindi nagustuhan ni Andres Bonafacio ang pagtutol at pangiinsulto ni Daniel Tirona, ay kanyang ipinahayag na walang bisa ang naganap na pag-pupulong at umalis. Matapos ang paglisan ni Bonifacio ay patuloy parin ang halalan at pagpupulong sa Tejeros at isinagawa ang panunumpa sa katungkulan ng mga bagong halal na pinuno maliban kay Bonifacio sa simbahan ng Sta Cruz Malabon.",
    "Matapos umalis ni Andres Bonifacio ay nagtungo siya sa Naic, Cavite kasama ang kanyang matatapat na tauhan at dito ay kanilang ginawa ang isang petisyon na tinawag na  ( Acta De Tejeros ) na nilagdaan na mahigit 40 kasapi ng katipunan. Sa petisyong ito ay kanilang ipinaliwanag kung bakit hindi katanggap-tanggap ang naging resulta ng pagpupulong sa Tejeros",
    "Kasunod nito ay bumuo si Andres Bonifacio ng isang hiwalay na pamahalaan sa ilalim ng batas ng ( Kasunduang Militar sa Naic ). Ang pangyayaring ito ay nakarating kay Aguinaldo at agad nyang ipinag-utos kay Koronel Agapito Banzon ang pagdakip kay Bonifacio sa mga kasamahan niya. Nagkaroon ng palitan ng putok ng subukang arestuhin si Bonifacio at ang kanyang mga kasamahan na nauwi sa pagdakip kay Bonifacio at pagkasawi ng kanyang kapatid na si Ciriaco Bonifacio.",
    "Humarap sa kasong Rebelyon at nahatulan ng kamatayan si Andres Bonafacio, siya ay ipinahuli at ipinapatay ni Aguinaldo sa kanyang mga tauhan. Iniutos kay Mariano Noriel na ibigay ang hatol sa isang selyadong sobre kay Lazaro Makapagal. Iniutos ang pagbaril kay Bonifacio kasama ang kanyang kapatid na lalaking si Procopio Bonifacio noong 10 Mayo 1897 malapit sa Bundok Nagpatong o Bundok Buntis. Sunod-sunod ang mga labanan sa pagitan ng mga Pilipino at Espanyol pagkatapos ng unang sigaw sa Pugad Lawin. Kasabay nito ang sunod-sunod din na pagkatalo sa ibat ibang lugar sa bansa kabilang ang grupo ni Emilio Aguinaldo sa Cavite, dahil dito ay umatras at nagtungo sa Talisay Batangas. Kalaunan ay nagtungo sa San Miguel, Bulacan upang iwasan ang malaking grupo ng mga espanyol as tumutugis sa kanila.",
    "Ang layunin ng Kumbensiyon sa Tejeros ay upang ayusin ang hindi pagkakaunawaan sa pagitan ng dalawang pangkat ng Katipunan sa Cavite at upang bumuo ng isang Rebolusyunaryong Pamahalaan, ngunit sa halip na magkaisa ay lalo pang tumindi ang hidwaan at humantong sa pagakamatay ni Andres Bonifacio.",
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
    "Ika-labing isang Pangyayari",
    "Ika-labing dalawang Pangyayari",
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
  
 const handleNext = async (e) => {
  e.preventDefault();
  if (selectedImage === 11) {
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
    return ;
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

const progressPercentage = ((selectedImage + 1) / images.length) * 100;


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
      <button onClick={handleViewMore} className="viewconvention">View in Video</button>
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
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
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
    <ChatBox /> 
</div>
  );       


};

export default Convention;
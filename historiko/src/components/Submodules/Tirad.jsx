import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Tirad.css';
import cecilio from '../../assets/cecilio.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import star from '../../assets/star.jfif';
import pasongtirad from '../../assets/pasongtirad.png';
import gregdelpillar from '../../assets/gregdelpillar.png';
import januario from '../../assets/januario.png';
import genfriedrich from '../../assets/genfriedrich.png';
import macario from '../../assets/macario.png';
import malvar from '../../assets/malvar.png';
import lukban from '../../assets/lukban.png';
import ola from '../../assets/ola.png';
import segismundo from '../../assets/segismundo.png';
import lazaro from '../../assets/lazaro.png';
import macabebe from '../../assets/macabebe.png';
import macabebes from '../../assets/macabebes.png';
import uss from '../../assets/uss.png';
import marso from '../../assets/marso.png';
import panunumpa from '../../assets/panunumpa.png';
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
  const [currentHeading, setCurrentHeading] = useState("Unang pangyayari");

  const images = [
    { src: pasongtirad, bg: pasongtirad, description: "Pasong Tirad Pass, Ilocos Sur" },
    { src: gregdelpillar, bg: gregdelpillar, description: "Gregorio Del Pilar" },
    { src: januario, bg: januario, description: "Januario Galut" },
    { src: genfriedrich, bg: genfriedrich, description: "General Friedrich Funston" },
    { src: cecilio, bg: cecilio, description: "Cecilio Segismundo" },
    { src: segismundo, bg: segismundo, description: "Cecilio Segismundo" },
    { src: lazaro, bg: lazaro, description: "Lazaro Segovia" },
    { src: macabebe, bg: macabebe, description: "Macabebe Scout" },
    { src: macabebes, bg: macabebes, description: "Macabebes" },
    { src: uss, bg: uss, description: "USS Vicksburg" },
    { src: marso, bg: marso, description: "Marso 23, 1901" },
    { src: panunumpa, bg: panunumpa, description: "" },
    { src: macario, bg: macario, description: "Macario Sakay" },
    { src: malvar, bg: malvar, description: "Miguel Malvar" },
    { src: lukban, bg: lukban, description: "Vicente Lukban" },
    { src: ola, bg: ola, description: "Simeon Ola" },
  ];

  const descriptions = [
    "Ang Pasong Tirad ay isang makitid at istratehikong lagusan sa kabundukan ng Tirad na bahagi ng kabundukan ng bayan ng Concepcion, Ilocos Sur  na Gregorio del Pilar ngayon, sa may kanlurang bahagi ng Cordillera. Sa pasong tirad ay humimpil ang batang Heneral na si Gregorio del Pilar kasama ang 60 sundalo upang hadlangan ang 300 amerikanong sundalo na tumutugis kay Aguinaldo. ",
    "Si Gregorio Del Pilar ay isang batang heneral na tinaguriang bayani ng pasong tirad na nagpamalas ng tapang, kagitingan at pagmamahal sa bayan. Minarapat nyang magpaiwan upang magkaroon ng sapat na oras si Emilio Aguinaldo upang makalayo at makarating sa Palanan, Isabela.",
    "Nahirapan ang mga Amerikano na magapi si Del Pilar sapagkat mataas ang kanilang kinalalagyan. Sa kasamaang palad ay tinulungan ang mga Amerikano ng isang Igorot na nagngangalang Januario Galut na may kaalaman sa topograpiya ng lugar at itinuro nito ang kinaroroonan ni Del Pilar at natagpuan ng mga Amerikano si Del PIlar noong Disyembre 2, 1899 at matapos nitoy walang tigil na putukan ang naganap at nasawi si Del Pilar kasama ang 60 nyang tauhan.  Siya ay nasawi sa 24 na taong gulang.",
    "Isang taon matapos ang pagkasawi ni Gregorio Del Pilar, Marso 23, 1901, nadakip si Aguinaldo ng mga Amerikano sa pangunguna ni General Friedrich Funston at sa tulong na rin ng ilang Pilipino mula sa Macabebe Scout sa pamumuno ni Tal Placido at Lazaro Segovia.",
    "Nauna rito, noong Pebrero 8, 1901, anim na mga gerilyang pinamunuan ni Cecilio Segismundo, isang Ilokano at pinagkatiwalaang mensahero ni Aguinaldo na nagtangan ng mahahalagang mga pabatid, ay sumuko sa mga Amerikano. Ilan sa mga mensaheng dala-dala ni Segismundo ay nasa anyong kodigo at nilagdaang 'Pastor' at 'Colon de Magdalo,' mga sagisag-panulat na madalas noong ginagamit ni Heneral Aguinaldo.",
    "Dagdag pa rito, ibinunyag ni Segismundo na si Aguinaldo ay wala nang higit pang limampung guwardiya sa kanyang kinalalagyan at saka niya itinuro na ang punong-himpilan ni Aguinaldo ay ang bayan ng Palanan sa lalawigan ng Isabela sa hilagang-silangang Luzon. Nalutas ni Funston ang mga mensahe sa tulong ni Lazaro Segovia. Ang pinakamahalaga sa mga mensahe ay isang kautusan kay Heneral Baldomero Aguinaldo na nagsabi sa kanyang magpadala ng ilang hukbo patungong Palanan.",
    "Si Segovia ay isang dating opisyales ng hukbong Espanyol na tumiwalag sa hukbong Pilipino at saka lumipat ng katapatan sa panig ng mga Amerikano. Naintindihan ni Segovia ang Ingles, Espanyol, at ang dialektong Tagalog. Gamit ang impormasyong ito, si Funston at ang kanyang pangkat ay nagsimulang bumuo ng isang plano para sa pagdakip kay Aguinaldo.",
    "Binihisan ni Funston ang mga Macabebe at ipinadala niya ang mga ito sa Palanan, kung saan sila'y nagkunwari bilang mga kawal na ipinakiusap ni Aguinaldo. Si Funston at apat na iba pang mga Amerikanong opisyal, na nakabihis bilang mga bilanggo ng digmaan, ay sinamahan ang pangkat. Ang piniling 78 Macabebe ay mga miyembro ng Company D, First Battalion, Macabebe Scouts at marunong magsalita ng Tagalog. Sila'y armado ng mga uri ng ripulong ginamit ng hukbo ni Aguinaldo. Dalawampu sa kanila ay isinuot ang unipormeng rayadillo ng hukbong Pilipino.",
    "Ang mga Macabebe ay isang tiyak na angkang tribo, mga katutubo ng Macabebe, Pampanga, na hindi ibang-iba ang mukha mula sa iba pang mga Pilipino, ngunit, sa ilalim ng pamahalaang Espanyol, dahil sa rason ng napakatagal na mga hidwaan kasama ang kanilang mga mas mapanghimagsik na mga kapit-bahay, ay ganap na nanumpa ng katapatan sa mga awtoridad na Espanyol. Noong dumating ang mga Amerikano inilipat nila ang kanilang katapatan sa huling nabanggit at naging isang kilala at mahalagang bahagi ng puwersang militar ng mga Amerikano. Ang pamahalaang Amerikano, na masayang-masaya sa pagkadakip ni Aguinaldo, ay pormal na ibinilang ang mga Macabebe bilang miyembro ng Philippine Scouts, isang ispesyal na yunit ng sandatahang lakas ng US.",
    "Bukod kay Segismundo, ibinilang ni Funston sina Hilario Tal Placido, Lazaro Segovia, Dionisio Bato, at Gregorio Cadhit. Si Hilario Tal Placido ay naging isang Tinyente Kolonel sa hukbong Pilipino at personal na kilala si Aguinaldo. Natakot si Funston na ang buong sambayanang Pilipino ay isang 'lihim na serbisyong' handang bigyang-babala si Aguinaldo, kung kaya maingat siyang nagplano tungkol sa kanilang paglayag patungong Palanan. Sila'y sumakay sa USS Vicksburg, kung saan ipinakita nilang isa itong ordinaryong komandarya lamang, tinahak ang katimugang dulo ng Luzon, at dumaan sa Kipot ng San Bernardino patungong Pacific Ocean. Sila'y naglayag pataas patungong silangang baybayin ng Luzon sa Casiguran Bay, 100 milya ang layo sa timog ng Palanan, kung saan sila dumating sa naunang nabanggit noong ika-14 ng Marso.",
    "Sa wakas ay narating ni Funston ang Palanan noong March 23, 1901. Si Hilario Tal Placido ay ligtas na nakarating sa kinaroroonan ni Aguinaldo, kung saan siya'y sinusunod ng pangunahing pangkat ng mga Macabebe sa isang 'di-malayong distansya. Nilihis ni Placido ang atensyon ni Aguinaldo sa pamamagitan ng kanyang pagkukuwento tungkol sa mga bagay-bagay. Sa pagdating ng mga Macabebe ay rito na nga naganap ang 'di-kanais-nais na pangyayari. Si Heneral Emilio Aguinaldo, noo'y pangulo ng Pilipinas ay ganap nang nadakip.",
    "Noong umaga ng Marso 25,1901 si Aguinaldo at tatlo sa kanyang mga kawal ay nagmartsa patungo sa baybayin ng Palanan. Ilang sandali, dumating na rin ang Vicksburg. Ang naturang barko ay dumating sa Manila Bay nang walang kamalay- malay mula sa kahit iisang kaluluwa sa Kalakhang Maynila. Si Aguinaldo ay iniprisinta kay Heneral Arthur C. MacArthur, Jr. bilang isang bilanggo ng digmaan ngunit itinuring na mabuti ng Heneral bilang isang katangi-tanging bisita ng mga sundalo sa Palasyo ng Malacañang mula Marso 28 hanggang Abril 20. Si Aguinaldo ay nanumpa ng katapatan sa pamahalaang Amerikano at noong Abril 1, 1901 ay naglabas ng isang proklamasyong nagpayo ng pagsuko sa patuloy na pag-aalsa at tanggapin na ang kapangyarihan ng mga amerikano.",
    "Ngunit ang pagsuko ni Aguinaldo ay hindi nangangahulugan ng pagwawakas ng Himagsikan. Marami paring Pilipino ang nagpatuloy sa pakikipaglaban tulad nina Macario Sakay   nang Cordillera at ni Miguel Malvar nang Batangas, Vicente Lukban nang samar at ang huling heneral na sumuko sa mga amerikano na si Simeon Ola nang Albay.",
    "Ngunit ang pagsuko ni Aguinaldo ay hindi nangangahulugan ng pagwawakas ng Himagsikan. Marami paring Pilipino ang nagpatuloy sa pakikipaglaban tulad nina Macario Sakay   nang Cordillera at ni Miguel Malvar nang Batangas, Vicente Lukban nang samar at ang huling heneral na sumuko sa mga amerikano na si Simeon Ola nang Albay.",
    "Ngunit ang pagsuko ni Aguinaldo ay hindi nangangahulugan ng pagwawakas ng Himagsikan. Marami paring Pilipino ang nagpatuloy sa pakikipaglaban tulad nina Macario Sakay   nang Cordillera at ni Miguel Malvar nang Batangas, Vicente Lukban nang samar at ang huling heneral na sumuko sa mga amerikano na si Simeon Ola nang Albay.",
    "Ngunit ang pagsuko ni Aguinaldo ay hindi nangangahulugan ng pagwawakas ng Himagsikan. Marami paring Pilipino ang nagpatuloy sa pakikipaglaban tulad nina Macario Sakay   nang Cordillera at ni Miguel Malvar nang Batangas, Vicente Lukban nang samar at ang huling heneral na sumuko sa mga amerikano na si Simeon Ola nang Albay.",
  ];

  const headings = [
    "Unang pangyayari",
    "Ika-pangalawang pangyayari",
    "Ika-tatlong pangyayari",
    "Ika-apat na pangyayari",
    "Ika-lima na pangyayari",
    "Ika-anim na pangyayari",
    "Ika-pito na pangyayari",
    "Ika-walo na pangyayari",
    "Ika-siyam na pangyayari",
    "Ika-sampu na pangyayari",
    "Ika-labing isa na pangyayari",
    "Ika-labing dalawa na pangyayari",
    "Ika-labing tatlo na pangyayari",
    "Ika-labing apat na pangyayari",
    "Ika-labing lima na pangyayari",
    "Ika-labing anim na pangyayari",
  ];

  useEffect(() => {
    if (!localStorage.getItem('hasViewedtirad3D') === null) {
      localStorage.setItem('hasViewedtirad3D', 'false');
    }
  }, []);

  useEffect(() => {
    if (user && localStorage.getItem('hasViewedtirad3D') === 'false') {
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
    localStorage.setItem('hasViewedtirad3D', 'true');
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

  const handleHeadingClick = (index) => {
    setSelectedImage(index);
    setCurrentHeading(headings[index]);
  };

  return (
    <div className="tirad">
      <ToastContainer/>
      <button onClick={handleViewMore} className='view'>View in 3D</button>
      <div className="tirad-container">
        <div className="tirad-description-container">
          <h1>Deskripsyon:</h1>
          <h2>{currentHeading}</h2>
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
      <div className="tirad-headings">
      {headings.map((heading, index) => (
        <button
          key={index}
          className={`heading-button ${index === selectedImage ? 'active' : ''}`}
          onClick={() => handleHeadingClick(index)}
        ></button>
      ))}
      </div>
    </div>
  );
};

export default Tirad;
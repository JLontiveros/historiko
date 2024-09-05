import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PugadLawin.css';
import kidst from '../../assets/kidst.png';
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

const PugadLawin = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

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

  const handlePrev = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };
  
  const handleNext = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/PugadLawin3d');
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
    <>
    <div className="PugadLawin">
    <button onClick={handleViewMore}>View in 3D</button>
    <div className="PugadLawin-container">
      <div className="PugadLawin-description-container">
        <h1>Description:</h1>
        <p>{descriptions[selectedImage]}</p>
      </div>
      <div className="PugadLawin-image-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`PugadLawin-image-wrapper ${index === selectedImage ? 'selected' : ''} ${
              isZoomed && index === selectedImage ? 'zoomed' : ''
            }`}
            onClick={index === selectedImage ? toggleZoom : () => setSelectedImage(index)}
            style={{
              order: index === selectedImage ? -1 : 0,
              zIndex: index === selectedImage ? 2 : 1,
              display: 
                index === selectedImage || 
                index === (selectedImage + 1) % images.length || 
                index === (selectedImage - 1 + images.length) % images.length 
                  ? 'block' 
                  : 'none'
            }}
          >
            <img src={image.src} alt={`Image ${index + 1}`} />
            <div className="PugadLawin-image-description">{image.description}</div>
          </div>
        ))}
      </div>
      <div className="PugadLawin-arrow-keys">
        <img src={arrownav2} alt="left" onClick={handlePrev} />
        {selectedImage < images.length - 1 && (
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default PugadLawin;
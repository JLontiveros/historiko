import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Convention.css';
import kidst from '../../assets/kidst.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import groupphoto from '../../assets/groupphoto.png';
import lastpage from '../../assets/lastpage.png';
import groupphoto2 from '../../assets/groupphoto2.png';
import mtbuntis from '../../assets/mtbuntis.jpg';

const Convention = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    { src: groupphoto, bg: groupphoto },
    { src: lastpage, bg: lastpage, description: "Huling pahina at mga lagda sa Acta De Tejeros mula sa Tradegy of the Revolution" },
    { src: groupphoto2, bg: groupphoto2 },
    { src: mtbuntis, bg: mtbuntis },
  ];

  const descriptions = [
    "Hindi nagustuhan ni Andres Bonafacio ang pagtutol at pangiinsulto ni Daniel Tirona, ay kanyang ipinahayag na walang bisa ang naganap na pagpupulong at umalis. Matapos ang paglisan ni bonifacio ay patuloy parin ang halalan at pagpupulong sa tejeros at isinagawa ang panunumpa sa katungkulan ng mga bagong halal na pinuno maliban kay Bonifacio sa simbahan ng Sta Cruz Malabon.",
    "Matapos umalis ni Andres Bonifacio ay nagtungo siya sa Naic, Cavite kasama ang kanyang matatapat na tauhan at ditto ay kanilang ginawa ang isang petisyon na tinawag na  ( Acta De Tejeros ) na nilagdaan na mahigit 40 kasapi ng katipunan. Sa petisyong ito ay kanilang ipinaliwanag kung bakit hindi katanggap tanggap ang naging resulta ng pagpupulong sa Tejeros",
    "Kasunod nito ay bumuo si Andres Bonifacio ng isang hiwalay na pamahalaan sa ilalim ng batas ng ( Kasunduang Militar sa Naic ). Ang pangyayaring ito ay nakarating kay Aguinaldo at agad nyang ipinag-utos kay Koronel Agapito Banzon ang pagdakip kay Bonifacio sa mga kasamahan niya. Nagkaroon ng palitan ng putok ng subukang arestuhin si bonifacio at ang kanyang mga kasamahan na nauwi sa pagdakip kay bonifacio at pagkasawi ng kanyang kapatid na si Ciriaco Bonifacio.",
    "Humarap sa kasong Rebelyon at nahatulan ng kamatayan si Andres Bonafacio, siya ay ipinahuli at ipinapatay ni Aguinaldo sa kanyang mga tauhan. Iniutos kay Mariano Noriel na ibigay ang hatol sa isang selyadong sobre kay Lazaro Makapagal. Iniutos ang pagbaril kay Bonifacio kasama ang kanyang kapatid na lalaking si Procopio Bonifacio noong 10 Mayo 1897 malapit sa Bundok Nagpatong (o Bundok Buntis). Sunod sunod ang mga labanan sa pagitan ng mga Pilipino at espanyol pagkatapos ng unang sigaw sa pugad lawin. Kasabay nito ang sunod sunod din na pagkatalo sa ibat ibang lugar sa bansa kabilang ang grupo ni Emilio Aguinaldo sa cavite, dahil dito ay umatras at nagtungo sa Talisay Batangas. Kalaunan ay nagtungo sa San Miguel, Bulacan upang iwasan ang malaking grupo ng mga espanyol as tumutugis sa kanila."
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
    navigate('/Convention3d');
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
    <div className="convention">
    <button onClick={handleViewMore}>View in 3D</button>
    <div className="convention-container">
      <div className="convention-description-container">
        <h1>Description:</h1>
        <p>{descriptions[selectedImage]}</p>
      </div>
      <div className="convention-image-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`convention-image-wrapper ${index === selectedImage ? 'selected' : ''} ${
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
      <div className="convention-arrow-keys">
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

export default Convention;
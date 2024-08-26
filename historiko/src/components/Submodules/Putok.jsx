import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Putok.css';
import kidst from '../../assets/kidst.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import bg1 from '../../assets/kidst.png';
import bg2 from '../../assets/historikobg.png';
import bg3 from '../../assets/kidst.png';
import bg4 from '../../assets/kidst.png';
import bg5 from '../../assets/kidst.png';

const Putok = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    { src: kidst, bg: bg1, description: "Private William Walter Grayson" },
    { src: kidst, bg: bg2, description: "Emilio Aguinaldo" },
    { src: kidst, bg: bg3, description: "General Elwell Otis" },
    { src: kidst, bg: bg4, description: "General Henry Lawton" },
    { src: kidst, bg: bg5, description: "General Antonio Luna" },
  ];

  const descriptions = [
    "Pebrero 4, 1899, Sumiklab ang digmaan sa pagitan ng Pilipinas at Amerika nang paputukan ni Pvt. William Walter Grayson ang tatlong Pilipinong Sundalo na naglalakad sa Calle Silencio at Sociego sa Sta. Mesa Manila. “HALT!! “ na ang ibigsabihin ay pahintuin ang mga sundalong Pilipino at ito ang nagging hudyat ng simula ng digmaang Pilipino – amerikano. Ang isa sa apat na Pilipinong sundalo na nabaril at nasawi ay si Corporal Anastacio Felix ng ikaapat na batalyon sa ilalim ng pamumuno ni Captain Serapio Narvaez.",
    "Bagamat pormal na pinagkaloob ng Espana ang pilipinas sa estados unidos, ipinagpatuloy ni Aguinaldo ang pagtatatag ng pamahalaan. Noong Enero 23, 1899, pinasinayaan ang Unang Republika sa Malolos, Bulacan. Hindi kinilala ng mga amerikano at iba pang dayuhang bansa ang pamahalaang ito. Subalit kinilala ito ng mga mamamayang Pilipino at itinaguyod ang kapangyarihan ng Republika ng Pilipinas sa pamununo ni Aguinaldo bilang Pangulo.. Buong magdamag na sinalakay ng mga Amerikano ang Maynila. Nagpadala si Emilio ng kinatawan kay Gen. Elwell Otis upang hingin ang pagtigil ng labanan upang hindi magdulot ng pinsala sa magkabilang panig.",
    "Hindi pinaunlakan ni Gen Elwell Otis at sinabing “ Fighting, having begun, must go on to the grim end”. Si General Elwell Otis ang namuno sa pagsalakay sa hilagang Maynila at Si Gen. Henry Lawton ang namuno sa pagsalakay sa timog Maynila. Walang nagawa si Aguinaldo kundi ang magdeklara ng pakikidigma at makipagpalitan ng putok laban sa mga amerikano. ANg hindi pagkilala ng Estados Unidos sa republika ng pilipinas ang unang hudyat ng pagbabago sa pakikitungo ng mga amerikano sa mga Pilipino at napatunayan ng mga Pilipino na ang tunay na hangarin ng mga arikano ay sakupin ang pilipinas.",
    "Pebrero 5, 1899, Binomba ng mga amerikano ang san juan, at sinalakay ang Marikina, Guadalupe at caloocan. Buong tapang at gilas na hinadlangan ito ng pinuno ng hukbong Pilipino sa pamumuno ni General Antonio Luna ngunit sila ay natalo at umurong at nagtungo sa Pulo, Bulacan.",
    "Description for General Antonio Luna"
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
    navigate('/Putok3d');
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
    <div className="putok">
      <button onClick={handleViewMore}>View in 3D</button>
      <div className="putok-container">
        <div className="putok-description-container">
          <h1>Description:</h1>
          <p>{descriptions[selectedImage]}</p>
        </div>
        <div className="putok-image-container">
        {images.map((image, index) => (
            <div
            key={index}
            className={`putok-image-wrapper ${index === selectedImage ? 'selected' : ''} ${
              isZoomed && index === selectedImage ? 'zoomed' : ''
            }`}
            onClick={index === selectedImage ? toggleZoom : () => setSelectedImage(index)}
            style={{
              order: index === selectedImage ? -1 : 0,
              zIndex: index === selectedImage ? 2 : 1
            }}
          >
            <img src={image.src} alt={`Image ${index + 1}`} />
            <div className="putok-image-description">{image.description}</div>
          </div>
          ))}
        </div>
        <div className="putok-arrow-keys">
          <img src={arrownav2} alt="left" onClick={handlePrev} />
          <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Putok;
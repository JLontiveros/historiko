import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Balangiga1.css';
import kidst from '../../assets/kidst.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import bg1 from '../../assets/kidst.png'; // Add your background images
import bg2 from '../../assets/historikobg.png';
import bg3 from '../../assets/kidst.png';

const Balangiga1 = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    { src: kidst, bg: bg1 },
    { src: kidst, bg: bg2 },
    { src: kidst, bg: bg3 },
  ];

  const descriptions = [
    "Ang labanan ay isang operasyon militar na binalak ni Kapitan Eugenio Daza ng Area Commander ng mga pwersa ni Vicente Lukban patungong Southeastern Samar, na naganap sa Balangiga noong 1901 sa panahon ng Digmaang Pilipino at Amerikano. Ang pagsalakay ay pinamunuan ni Valeriano Abanador na Jefe de la Policia (Chief of Police).",
    "This is the description for the second image. You can replace this text with the actual description.",
    "This is the description for the third image. You can replace this text with the actual description.",
  ];

  const handlePrev = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/Balangiga3d');
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
    <div className="balangiga">
    <button onClick={handleViewMore}>View in 3D</button>
    <div className="balangiga1-container">
      <div className="balangiga-description-container">
        <h1>Description:</h1>
        <p>{descriptions[selectedImage]}</p>
      </div>
      <div className="balangiga-image-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-wrapper ${index === selectedImage ? 'selected' : ''} ${
              isZoomed && index === selectedImage ? 'zoomed' : ''
            }`}
            onClick={index === selectedImage ? toggleZoom : () => setSelectedImage(index)}
          >
            <img src={image.src} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="balangiga-arrow-keys">
        <img src={arrownav2} alt="left" onClick={handlePrev} />
        <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
      </div>
    </div>
    </div>
    </>
  );
};

export default Balangiga1;
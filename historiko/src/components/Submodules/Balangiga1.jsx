import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Balangiga1.css';
import kidst from '../../assets/kidst.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import bg1 from '../../assets/kidst.png'; // Add your background images
import genjacob from '../../assets/genjacob.png';
import kirambates from '../../assets/kirambates.png';

const Balangiga1 = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    { src: genjacob, bg: genjacob, description: "Brig. Gen Jacob Smith"  },
    { src: kirambates, bg: kirambates, description: "Kiram Bates Treaty 1899"  },
  ];

  const descriptions = [
    "Bilang ganti ay ipinadala ang malaking bilang ng mga sundalong Amerikano sa pangunguna ni Brigadier  Gen Jacob Smith. Malawakang pagpatay at pagsunog sa mga ari-arian ang isingawa nila sa Balangiga. ANg lahat ng kalalakihang may kakayahang humawak ng armas mula 10 taong gulang pataas ay pinagutos na patayin. Sa loob ng anim na buwan ang balangiga ay nagmistulang isang disyerto dahil sinunog ng mga amerikano ang buong baying ito.",
    "Ang mga moro sa Mindanao at Sulu ay nanahimik, at nagmasid lamang upang hindi masangkot sa digmaan. Lumagda ng isang kasunduan si Brigadier General John C. Bates at si Sultan Jamal ul Kiram II kasama ang mga kinatawang datu ng sulu noong Agosto 10, 1899 na nagsasaad na kinikilala ng Sultan ang kapangyarihan ng Estados Unidos sa buong kapuluan ng Sulu, Igagalang ng estados unidos ang mga karapatan at karangalan ng sultan ang kaniyang mga datu; at hindi makikialam ang estados unidos sa relihiyon ng mga moro.  Hindi kinilala ang kasunduang Bates makalipas ang dalawang taon ay pinuksa ng mga amerikano ang mga muslim sa Mindanao matapos nilang matalo ang mga Pilipino sa Luzon.",
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
    navigate('/Balangiga3d', { state: { showToast: true } });
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
    <div className="balangiga1">
    <button onClick={handleViewMore}>View in 3D</button>
    <div className="balangiga1-container">
      <div className="balangiga1-description-container">
        <h1>Description:</h1>
        <p>{descriptions[selectedImage]}</p>
      </div>
      <div className="balangiga1-image-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`balangiga1-image-wrapper ${index === selectedImage ? 'selected' : ''} ${
              isZoomed && index === selectedImage ? 'zoomed' : ''
            }`}
            onClick={index === selectedImage ? toggleZoom : () => setSelectedImage(index)}
          >
            <img src={image.src} alt={`Image ${index + 1}`} />
            <div className="balangiga1-image-description">{image.description}</div>
          </div>
        ))}
      </div>
      <div className="balangiga1-arrow-keys">
        <img src={arrownav2} alt="left" onClick={handlePrev} />
        <img src={arrownav} alt="right" className="arrow-right" onClick={handleNext} />
      </div>
    </div>
    </div>
    </>
  );
};

export default Balangiga1;
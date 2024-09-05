import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kasunduan.css';
import kidst from '../../assets/kidst.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import groupnabiak from '../../assets/groupnabiak.png';
import republikangbiak from '../../assets/republikangbiak.jpg';
import trio from '../../assets/trio.png';
import barkonguranus from '../../assets/barkonguranus.png';
import nota from '../../assets/nota.png';
import classpic from '../../assets/classpic.png';

const Kasunduan = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

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
    navigate('/Kasunduan3d');
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
    <div className="Kasunduan">
    <button onClick={handleViewMore}>View in 3D</button>
    <div className="Kasunduan-container">
      <div className="Kasunduan-description-container">
        <h1>Description:</h1>
        <p>{descriptions[selectedImage]}</p>
      </div>
      <div className="Kasunduan-image-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`Kasunduan-image-wrapper ${index === selectedImage ? 'selected' : ''} ${
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
      <div className="Kasunduan-arrow-keys">
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

export default Kasunduan;
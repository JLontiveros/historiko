import React, { useState, useRef, useEffect } from 'react';
import ChatBox from '../Chat/ChatBot';
import { Link } from 'react-router-dom';
import './Modules.css';
import flagsImage from '../../assets/flag.png';
import axesImage from '../../assets/axe.png';
import questionMark from '../../assets/mark.png';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

function Modules() {
  const secondSectionRef = useRef(null);
  const [hoverText1, setHoverText1] = useState(false);
  const [hoverText2, setHoverText2] = useState(false);
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRef = ref(storage, 'Historiko2_1.mp4');
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const handleVisibilityChange = () => {
        if (!document.hidden && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [videoUrl]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      },
      { threshold: 0.1 }
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    return () => {
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="modules">
      <div className="video-background-modules">
        {videoUrl && (
          <video 
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="module-container">
        <div className="module">
          <div className="image-container">
            <img src={flagsImage} alt="US and Philippines flags" className="module-icon" />
          </div>
          <div className="title-container"
               onMouseEnter={() => setHoverText1(true)}
               onMouseLeave={() => setHoverText1(false)}>
            <h2>Panahon ng Digmaang Pilipino-Amerikano</h2>
            {hoverText1 && <div className="hover-text">Ang armadong hidwaan sa pagitan ng Unang Republikang Pilipino at ng Estados Unidos na tumagal mula Pebrero 4, 1899 hanggang Hulyo 2, 1902. Ang naturang digmaan ay pagpapatuloy ng pakikibaka ng mga Pilipino para sa Kalayaan na nagsimula noong 1896 sa pagsiklab ng Himagsikang Pilipino</div>}
          </div>
          <ul>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa
            </li>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Labanan sa Tirad Pass
            </li>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Balangiga Massacre
            </li>
          </ul>

          <Link to="/Unatalakayin" state={{ showToast: true, fromModules: true }}>
            <button>Magsaliksik</button>
          </Link>

        </div>
        <div className="module">
          <div className="image-container">
            <img src={axesImage} alt="Crossed axes" className="module-icon" />
          </div>
          <div className="title-container"
               onMouseEnter={() => setHoverText2(true)}
               onMouseLeave={() => setHoverText2(false)}>
            <h2>Panahon ng Himagsikang Pilipino</h2>
            {hoverText2 && <div className="hover-text">Nasusuri ang mga dahilan at pangyayaring naganap sa Panahong ng Himagsikang Pilipino</div>}
          </div>
          <ul>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Sigaw ng Pugad-Lawin
            </li>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Tejeros Convention
            </li>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Kasunduan sa Biak-na-Bato
            </li>
          </ul>

          <Link to="/Dalwatalakayin" state={{ showToast: true, fromModules: true }}>
            <button>Magsaliksik</button>
          </Link>

        </div>
      </div>
       <ChatBox /> 
       </div>
  );
}

export default Modules;
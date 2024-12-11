import React, { useEffect, useState } from 'react';
import ChatBox from '../Chat/ChatBot';
import './About.css';
import roombg from '../../assets/roombg.png';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

const About = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  // Fetch video URL from Firebase
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRef = ref(storage, 'Historiko2_2.mp4');
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, []);

  // Update screen size (desktop vs mobile) based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent right-click on videos
  const handleRightClick = (e) => {
    e.preventDefault();
  };

  // Video player component to handle different views
  const VideoPlayer = ({ className, isMobileView }) => (
    <video
    className={className}
    src={videoUrl}
    autoPlay
    loop
    playsInline
    onContextMenu={handleRightClick}
  >
    Your browser does not support the video tag.
  </video>
  );

  return (
    <div className='about'>
      <img src={roombg} alt='background' className='about-bg'/>
      <div className='content'>
        <h1>Patungkol sa Historiko</h1>
        <div className='box'>
          <div className='text-content'>
            <p className='firstline'>Maligayang pagdating sa Historiko! Kami ay isang pangkat na naglalayong palakasin ang diwa ng Kasaysayan sa pamamagitan ng pag-aaral ng kasaysayan ng Pilipinas, partikular sa:</p>
            <p className='one'>1. <b>Digmaang Pilipino-Amerikano</b></p>
            <div className='bullet'>
              <p>-Unang Putok sa panukulan ng Silencio at Sociego, Sta Mesa</p>
              <p>-Labanan sa Tirad Pass </p> 
              <p>-Balangiga Massacre</p>
            </div>
            <p className='two'>2. <b>Himagsikang Pilipino</b></p>
            <div className='bullet2'>
              <p>-Sigaw ng Pugad-Lawin</p>
              <p>-Tejeros Convention</p>
              <p>-Kasunduan sa Biak-na-Bato</p>
            </div>
            <h2><b>Layunin:</b></h2>
            <div className='layunin'>
              <ul>
                <li>Edukasyon: Magbigay ng makabuluhan at kawili-wiling impormasyon.</li>
                <li>Inspirasyon: Hikayatin ang pagmamalaki sa ating pinagmulan.</li>
                <li>Pagkakaisa: Palakasin ang pagmamahal sa bayan.</li>
              </ul>
            </div>
          </div>
          <div className="video-position-wrapper">
            <div className="video-container-about desktop-only">
              {videoUrl && isDesktop && (
                <VideoPlayer 
                  className='about-video'
                  isMobileView={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile video */}
      <div className="video-container-about mobile-only">
        {videoUrl && !isDesktop && (
          <VideoPlayer 
            className='about-video'
            isMobileView={true}
          />
        )}
      </div>
    <ChatBox /> 
</div>
  );       


};

export default About;
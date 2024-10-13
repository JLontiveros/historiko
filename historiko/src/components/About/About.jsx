import React, { useRef, useEffect } from 'react';
import './About.css';
import roombg from '../../assets/roombg.png';

const About = () => {
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const secondSectionRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  }, []);

  useEffect(() => {
    // YouTube iframe API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('youtube-player', {
        events: {
          'onReady': (event) => {
            event.target.playVideo();
          }
        }
      });
    };
  }, []);
  
  return (
    <div className='about'>
      <img src={roombg} alt='background' className='about-bg'/>
      <div className='content'>
        <h1>Patungkol sa Historiko</h1>
        <div className='box'>
          <p>Maligayang pagdating sa Historiko! Kami ay isang pangkat na naglalayong palakasin ang diwa ng History sa pamamagitan ng pag-aaral ng kasaysayan ng Pilipinas, partikular sa:</p>
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
      </div>
      <div className="video-iframe">
        <iframe 
          id="youtube-player"
          ref={iframeRef}
          src="https://www.youtube.com/embed/nMNHSJ-y8JY?autoplay=1&unmute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=nMNHSJ-y8JY&enablejsapi=1&origin=http://localhost:3000&modestbranding=1" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default About;
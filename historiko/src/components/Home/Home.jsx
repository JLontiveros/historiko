import React, { useRef, useEffect, useState } from 'react';
import './Home.css';
import SignUp from '../SignUp/SignUp';
import { useAuth } from '../../App';
import homebg from '../../assets/homebg.png';
import homebg2 from '../../assets/homebg2.png';
import homebg3 from '../../assets/homebg3.png';
import homebg4 from '../../assets/homebg4.png';
import ImageSlideshow from './ImageSlideshow';

const Home = () => {
  const secondSectionRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const slideImages = [homebg, homebg2, homebg3, homebg4];
  const iframeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      },
      { threshold: 0.1 }
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    // YouTube iframe API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('youtube-player', {
        events: {
          'onReady': (event) => {
            event.target.mute();
            event.target.playVideo();
          }
        }
      });
    };

    return () => {
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="home-container">
      <section className="video-section">
        {/* Desktop video */}
        
        <div className="video-background">
          <iframe 
            id="youtube-player"
            ref={iframeRef}
            src="https://www.youtube.com/embed/81rDsHT5Tkg?autoplay=1&unmute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=81rDsHT5Tkg&enablejsapi=1&origin=http://localhost:3000&modestbranding=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        

        {/* Mobile video */}
        <video autoPlay loop muted playsInline className='background-video mobile-video'>
          <source src='https://testing-web-puce.vercel.app'/>
        </video>
        
        <div className='text-overlay'>
          <div className='heading'>
            <h1>"Sa Historiko, Buhay ang <br className="desktop-break"/> Pagmamahal sa Bayan!"</h1>
          </div>
          <div className='subheading'>
            <h3>"Maligayang pagdating! Tuklasin ang kwento ng ating mga bayani at ang diwa <br className="desktop-break"/> ng nasyonalismo. Sama-sama nating buhayin ang kasaysayan!"</h3>
          </div>
        </div>
      </section>
      
      <section ref={secondSectionRef} className={`video-section ${isIntersecting ? 'snap-in' : ''}`}>
        {/* Desktop video */}
        <video autoPlay loop muted playsInline className='background-video2 desktop-video'>
          <source src='https://testing-web-puce.vercel.app'/>
        </video>

        {/* Mobile video */}
        <video autoPlay loop muted playsInline className='background-video2 mobile-video'>
          <source src='https://testing-web-puce.vercel.app'/>
        </video>
        
        <div className='signup-overlay'>
          {isAuthenticated ? (
            <div className="home-slide">
              <ImageSlideshow images={slideImages} />
            </div>
          ) : (
            <SignUp />
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
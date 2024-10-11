import React, { useRef, useEffect, useState } from 'react';
import './Home.css';
import SignUp from '../SignUp/SignUp';
import hero from "/videos/hero.mp4";
import underhero from "/videos/underhero.mp4";
import landingphone1 from "/videos/landingphone1.mp4";
import landingphone2 from "/videos/landingphone2.mp4";
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

    return () => {
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="home-container">
      <section className="video-section">
        <video autoPlay loop muted playsInline className='background-video desktop-video'>
          <source src={hero} type='video/mp4'/>
        </video>
        <video autoPlay loop muted playsInline className='background-video mobile-video'>
          <source src={landingphone1} type='video/mp4'/>
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
        <video autoPlay loop muted playsInline className='background-video2 desktop-video'>
          <source src={underhero} type='video/mp4'/>
        </video>
        <video autoPlay loop muted playsInline className='background-video2 mobile-video'>
          <source src={landingphone2} type='video/mp4'/>
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
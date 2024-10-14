import React, { useRef, useEffect, useState } from 'react';
import './Home.css';
import SignUp from '../SignUp/SignUp';
import { useAuth } from '../../App';
import homebg from '../../assets/homebg.png';
import homebg2 from '../../assets/homebg2.png';
import homebg3 from '../../assets/homebg3.png';
import homebg4 from '../../assets/homebg4.png';
import ImageSlideshow from './ImageSlideshow';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase.js';

const Home = () => {
  const secondSectionRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const slideImages = [homebg, homebg2, homebg3, homebg4];
  const iframeRef = useRef(null);
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [underHeroVideoUrl, setUnderHeroVideoUrl] = useState('');
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const heroRef = ref(storage, 'hero.mp4');
        const underHeroRef = ref(storage, 'underhero.mp4');
        const heroUrl = await getDownloadURL(heroRef);
        const underHeroUrl = await getDownloadURL(underHeroRef);
        setHeroVideoUrl(heroUrl);
        setUnderHeroVideoUrl(underHeroUrl);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();

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
        {/* Desktop video */}
        <div className="video-background">
          {heroVideoUrl && (
            <video autoPlay loop muted playsInline>
              <source src={heroVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Mobile video */}
        <div className="video21-background mobile-only">
          {heroVideoUrl && (
            <video autoPlay loop muted playsInline>
              <source src={heroVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
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
        <div className="video2-background">
          {underHeroVideoUrl && (
            <video autoPlay loop muted playsInline>
              <source src={underHeroVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Mobile video */}
        <div className="video22-background mobile-only">
          {underHeroVideoUrl && (
            <video autoPlay loop muted playsInline>
              <source src={underHeroVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
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
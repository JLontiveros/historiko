import React, { useRef, useEffect, useState } from 'react';
import './Home.css';
import SignUp from '../SignUp/SignUp';
import backgroundVideo from "../../assets/hero.mp4";
import backgroundVideo2 from "../../assets/underhero.mp4";
import { useAuth } from '../../App'; // Import the useAuth hook

const Home = () => {
  const secondSectionRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { isAuthenticated, user } = useAuth(); // Use the authentication context

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
        <video autoPlay loop muted className='background-video'>
          <source src={backgroundVideo} type='video/mp4'/>
        </video>
        <div className='text-overlay'>
          <div className='heading'>
            <h1>"Sa Historiko, Buhay ang <br/> Pagmamahal sa Bayan!"</h1>
          </div>
          <div className='subheading'>
            <h3>"Maligayang pagdating! Tuklasin ang kwento ng ating mga bayani at ang diwa <br/> ng nasyonalismo. Sama-sama nating buhayin ang kasaysayan!"</h3>
          </div>
        </div>
      </section>
      
      <section ref={secondSectionRef} className={`video-section ${isIntersecting ? 'snap-in' : ''}`}>
        <video autoPlay loop muted className='background-video2'>
          <source src={backgroundVideo2} type='video/mp4'/>
        </video>
        <div className='signup-overlay'>
          {isAuthenticated ? (
            <div className="welcome-message">
              {/* <h2>Welcome to Historiko, {user.username}!</h2>
              <p>You're now logged in. Explore our modules and learn about Philippine history!</p> */}
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
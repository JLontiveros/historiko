import React, { useRef, useEffect, useState, useContext  } from 'react';
import ChatBox from '../Chat/ChatBot';
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
import { ScrollContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ChatBox from '../Chat/ChatBot';

const Home = () => {
  const secondSectionRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const slideImages = [homebg, homebg2, homebg3, homebg4];
  const { shouldScrollToSignup, setShouldScrollToSignup } = useContext(ScrollContext);
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [underHeroVideoUrl, setUnderHeroVideoUrl] = useState('');
  const [mobileTopVideoUrl, setMobileTopVideoUrl] = useState('');
  const [mobileBottomVideoUrl, setMobileBottomVideoUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [isSlideshowRendered, setIsSlideshowRendered] = useState(false);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const heroRef = ref(storage, 'hero.mp4');
        const underHeroRef = ref(storage, 'underhero.mp4');
        const mobileTopRef = ref(storage, '800x1000first.mp4');
        const mobileBottomRef = ref(storage, '100x1000sec0001-0250.mp4');
        
        const [heroUrl, underHeroUrl, mobileTopUrl, mobileBottomUrl] = await Promise.all([
          getDownloadURL(heroRef),
          getDownloadURL(underHeroRef),
          getDownloadURL(mobileTopRef),
          getDownloadURL(mobileBottomRef)
        ]);

        setHeroVideoUrl(heroUrl);
        setUnderHeroVideoUrl(underHeroUrl);
        setMobileTopVideoUrl(mobileTopUrl);
        setMobileBottomVideoUrl(mobileBottomUrl);

      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 }
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    if (shouldScrollToSignup && secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      setShouldScrollToSignup(false); // Reset the flag after scrolling
    }

    return () => {
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, [shouldScrollToSignup, setShouldScrollToSignup, user]);

  useEffect(() => {
    if (user) {
      if (localStorage.getItem('hasLoggedIn') === true) {
        localStorage.setItem('hasLoggedIn', 'false');
      }
      if (localStorage.getItem('hasShownToast') !== 'true' && isSlideshowRendered) {
        toast.success('Matagumpay na nakapag sign in!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        localStorage.setItem('hasShownToast', 'true');
      }
    }
  }, [user, isSlideshowRendered]);

  const handleSlideshowRendered = () => {
    setIsSlideshowRendered(true); // Mark slideshow as rendered
  };

  return (
    <div className="home-container">
      <section className="video-section">
        {/* Desktop video */}
        {!isMobile && (
          <div className="video-background">
            {heroVideoUrl && (
              <video autoPlay loop muted playsInline>
                <source src={heroVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {/* Mobile video */}
        {isMobile && (
          <div className="video-background mobile-only">
            {mobileTopVideoUrl && (
              <video autoPlay loop muted playsInline>
                <source src={mobileTopVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        
        <div className='text-overlay'>
          <div className='heading'>
            <h1>"Sa Historiko, Buhay ang <br className="desktop-break"/> Pagmamahal sa Bayan!"</h1>
          </div>
          <div className='subheading'>
            <h3>"Maligayang pagdating! Tuklasin ang kwento ng ating mga bayani at ang diwa <br className="desktop-break"/> ng nasyonalismo. Sama-sama nating buhayin ang kasaysayan!"</h3>
          </div>
        </div>
      </section>
      
      <section ref={secondSectionRef} id="sign-up" className={`video-section ${isIntersecting ? 'snap-in' : ''}`}>
        {/* Desktop video */}
        {!isMobile && (
          <div className="video2-background">
            {underHeroVideoUrl && (
              <video autoPlay loop muted playsInline>
                <source src={underHeroVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {/* Mobile video */}
        {isMobile && (
          <div className="video2-background mobile-only">
            {mobileBottomVideoUrl && (
              <video autoPlay loop muted playsInline>
                <source src={mobileBottomVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        
        <div className='signup-overlay'>
          {isAuthenticated ? (
            <div className="home-slide">
              <ToastContainer />
              <ImageSlideshow images={slideImages} onRendered={handleSlideshowRendered}/>
            </div>
          ) : (
            <SignUp />
          )}
        </div>
      </section>

      {/* <ChatBox /> */} 
    </div>
    
  );
};

export default Home;
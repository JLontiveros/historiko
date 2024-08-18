import React from 'react';
import './Home.css';
import SignUp from '../SignUp/SignUp';
import backgroundVideo from "../../assets/hero.mp4";
import backgroundVideo2 from "../../assets/underhero.mp4";

const Home = () => {

  return (
    <>
    <div className='text'>
          <div className='heading'>
            <h1>"Sa Historiko, Buhay ang <br/> Pagmamahal sa Bayan!"</h1>
          </div>
          <div className='subheading'>
            <h3>"Maligayang pagdating! Tuklasin ang kwento ng ating mga bayani at ang diwa <br/> ng nasyonalismo. Sama-sama nating buhayin ang kasaysayan!"</h3>
          </div>
        </div>
        <video autoPlay loop muted id='video'>
          <source src={backgroundVideo} type='video/mp4'/>
        </video>
        <SignUp/>
        <video autoPlay loop muted id='video2'>
          <source src={backgroundVideo2} type='video/mp4'/>
        </video>
    </>
  )
}

export default Home
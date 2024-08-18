import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import SignUp from './components/SignUp/SignUp';
import backgroundVideo from "./assets/hero.mp4";
import backgroundVideo2 from "./assets/underhero.mp4";
import './App.css';
import Modules from './components/Modules/Modules';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content-overlay">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/modules" element={<Modules />} />
              </Routes>
          </div>
        </div>
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
        
      </div>
    </Router>
  );
}

export default App;
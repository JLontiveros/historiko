import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import './App.css';
import Modules from './components/Modules/Modules';
import Unatalakayin from './components/Unatalakayin/Unatalakayin';
import Dalwatalakayin from './components/Dalwatalakayin/Dalwatalakayin';
import Minigames from './components/Minigames/Minigames';
import UnangPutok from './components/Unangputok/Unangputok';
import TiradPass from './components/TiradPass/TiradPass';
import Balangiga from './components/Balangiga/Balangiga';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content-overlay">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/About" element={<About />} />
              <Route path="/Modules" element={<Modules />} />
              <Route path="/Unatalakayin" element={<Unatalakayin />} />
              <Route path="/Unangputok" element={<UnangPutok />} />
              <Route path="/Tiradpass" element={<TiradPass />} />
              <Route path="/balangiga" element={<Balangiga />} />
              <Route path="/Dalwatalakayin" element={<Dalwatalakayin />} />
              <Route path="/Minigames" element={<Minigames />} />
            </Routes>
          </div>
        </div>        
      </div>
    </Router>
  );
}

export default App;
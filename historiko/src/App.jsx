import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
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
              <Route path="/Home" element={<Home />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/About" element={<About />} />
              <Route path="/Modules" element={<Modules />} />
            </Routes>
          </div>
        </div>        
      </div>
    </Router>
  );
}

export default App;
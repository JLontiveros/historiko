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
import Sigaw from './components/Sigaw/Sigaw'
import Tejeros from './components/Tejeros/Tejeros';
import Bato from './components/Bato/Bato';
import Minigames from './components/Minigames/Minigames';
import UnangPutok from './components/Unangputok/Unangputok';
import TiradPass from './components/TiradPass/TiradPass';
import Balangiga from './components/Balangiga/Balangiga';
import TopicMarking from './components/TopicMarking/TopicMarking';
import Putok from './components/Submodules/Putok';
import Putok3d from './components/Sub3d/Putok3d';
import Tirad from './components/Submodules/Tirad';
import Tirad3d from './components/Sub3d/Tirad3d';
import Balangiga1 from './components/Submodules/Balangiga1';
import Balangiga3d from './components/Sub3d/Balangiga3d';
import PugadLawin from './components/Submodules/PugadLawin';
import PugadLawin3d from './components/Sub3d/PugadLawin3d';
import Convention from './components/Submodules/Convention';
import Convention3d from './components/Sub3d/Convention3d';
import Kasunduan from './components/Submodules/Kasunduan';
import Kasunduan3d from './components/Sub3d/Kasunduan3d';


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
              <Route path="/Sigaw" element={<Sigaw />} />
              <Route path="/Tejeros" element={<Tejeros />} />
              <Route path="/Bato" element={<Bato />} />
              <Route path="/Minigames" element={<Minigames />} />
              <Route path="/TopicMarking" element={<TopicMarking />} />
              <Route path="/Putok" element={<Putok />} />
              <Route path="/Putok3d" element={<Putok3d />} />
              <Route path="/Tirad" element={<Tirad />} />
              <Route path="/Tirad3d" element={<Tirad3d />} />
              <Route path="/Balangiga1" element={<Balangiga1 />} />
              <Route path="/Balangiga3d" element={<Balangiga3d />} />
              <Route path="/PugadLawin" element={<PugadLawin />} />
              <Route path="/PugadLawin3d" element={<PugadLawin3d />} />
              <Route path="/Convention" element={<Convention />} />
              <Route path="/Convention3d" element={<Convention3d />} />
              <Route path="/Kasunduan" element={<Kasunduan />} />
              <Route path="/Kasunduan3d" element={<Kasunduan3d />} />
            </Routes>
          </div>
        </div>        
      </div>
    </Router>
  );
}

export default App;
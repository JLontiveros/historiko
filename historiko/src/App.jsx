import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { MarkedTopicsProvider, useMarkedTopics } from './components/context/MarkedTopicsContext';
import { RewardProvider } from './components/context/RewardContext';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
// import Chat from './components/Chat/ChatBot';
import NotFound from './components/Home/NotFound';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import './App.css';
import Modules from './components/Modules/Modules';
import Unatalakayin from './components/Unatalakayin/Unatalakayin';
import Unavid from './components/Unatalakayin/Vid';
import Dalwatalakayin from './components/Dalwatalakayin/Dalwatalakayin';
import Dalawavid from './components/Dalwatalakayin/Vid';
import Sigaw from './components/Sigaw/Sigaw'
import Tejeros from './components/Tejeros/Tejeros';
import Bato from './components/Bato/Bato';
import Minigames from './components/Minigames/Minigames';
import UnangPutok from './components/Unangputok/Unangputok';
import Tiradpass from './components/Tiradpass/Tiradpass';
import Balangiga from './components/Balangiga/Balangiga';
import TopicMarking from './components/TopicMarking/TopicMarking';
import Putok from './components/Submodules/Putok';
import Putok3d from './components/Sub3d/Putok3d';
import Putok3d2 from './components/Sub3d/Putok3d2';
import Tirad from './components/Submodules/Tirad';
import Tirad3d from './components/Sub3d/Tirad3d';
import Tirad3d2 from './components/Sub3d/Tirad3d2';
import Balangiga1 from './components/Submodules/Balangiga1';
import Balangiga3d from './components/Sub3d/Balangiga3d';
import Balangiga3d2 from './components/Sub3d/Balangiga3d2';
import PugadLawin from './components/Submodules/PugadLawin';
import PugadLawin3d from './components/Sub3d/PugadLawin3d';
import PugadLawin3d2 from './components/Sub3d/PugadLawin3d2';
import Convention from './components/Submodules/Convention';
import Convention3d from './components/Sub3d/Convention3d';
import Convention3d2 from './components/Sub3d/Convention3d2';
import Kasunduan from './components/Submodules/Kasunduan';
import Kasunduan3d from './components/Sub3d/Kasunduan3d';
import Kasunduan3d2 from './components/Sub3d/Kasunduan3d2';
import Dashboard from './components/Minigames/Dashboard';

// Create Authentication Context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);
export const ScrollContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldScrollToSignup, setShouldScrollToSignup] = useState(false);

  useEffect(() => {
    const preventZoom = (event) => {
      if (event.ctrlKey && (event.type === 'wheel' || event.type === 'keydown')) {
        event.preventDefault();
      }
    };

    // Prevent zoom on scroll or keypress
    window.addEventListener('wheel', preventZoom, { passive: false });
    window.addEventListener('keydown', preventZoom);

    return () => {
      window.removeEventListener('wheel', preventZoom);
      window.removeEventListener('keydown', preventZoom);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const ProtectedRoute = ({ children }) => {
    if (!user || !user.id) {
      setShouldScrollToSignup(true);
      return <Navigate to="/" replace />;
    }
    return children;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      <ScrollContext.Provider value={{ shouldScrollToSignup, setShouldScrollToSignup }}>
      <MarkedTopicsProvider> {/* Wrap the entire app with MarkedTopicsProvider */}
      <RewardProvider>
      <Router>
        <div className="App">
          <div className="content-overlay">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                { /* <Route path="/Chat" element={<Chat />} /> */}
                <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/About" element={<About />} />
                <Route path="/Modules" element={<ProtectedRoute><Modules /></ProtectedRoute>} />
                <Route path="/Unatalakayin" element={<ProtectedRoute><Unatalakayin /></ProtectedRoute>} />
                <Route path="/Unavid" element={<ProtectedRoute><Unavid /></ProtectedRoute>} />
                <Route path="/Dalawavid" element={<ProtectedRoute><Dalawavid /></ProtectedRoute>} />
                <Route path="/Unangputok" element={<ProtectedRoute><UnangPutok /></ProtectedRoute>} />
                <Route path="/Tiradpass" element={<ProtectedRoute><Tiradpass /></ProtectedRoute>} />
                <Route path="/balangiga" element={<ProtectedRoute><Balangiga /></ProtectedRoute>} />
                <Route path="/Dalwatalakayin" element={<ProtectedRoute><Dalwatalakayin /></ProtectedRoute>} />
                <Route path="/Sigaw" element={<ProtectedRoute><Sigaw /></ProtectedRoute>} />
                <Route path="/Tejeros" element={<ProtectedRoute><Tejeros /></ProtectedRoute>} />
                <Route path="/Bato" element={<ProtectedRoute><Bato /></ProtectedRoute>} />
                <Route path="/Quiz" element={<ProtectedRoute><Minigames /></ProtectedRoute>} />
                <Route path="/StudentDashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/TopicMarking" element={<ProtectedRoute><TopicMarking /></ProtectedRoute>} />
                <Route path="/Putok" element={<ProtectedRoute><Putok /></ProtectedRoute>} />
                <Route path="/Putok3d" element={<ProtectedRoute><Putok3d /></ProtectedRoute>} />
                <Route path="/Putok3d2" element={<ProtectedRoute><Putok3d2 /></ProtectedRoute>} />
                <Route path="/Tirad" element={<ProtectedRoute><Tirad /></ProtectedRoute>} />
                <Route path="/Tirad3d" element={<ProtectedRoute><Tirad3d /></ProtectedRoute>} />
                <Route path="/Tirad3d2" element={<ProtectedRoute><Tirad3d2 /></ProtectedRoute>} />
                <Route path="/Balangiga1" element={<ProtectedRoute><Balangiga1 /></ProtectedRoute>} />
                <Route path="/Balangiga3d" element={<ProtectedRoute><Balangiga3d /></ProtectedRoute>} />
                <Route path="/Balangiga3d2" element={<ProtectedRoute><Balangiga3d2 /></ProtectedRoute>} />
                <Route path="/PugadLawin" element={<ProtectedRoute><PugadLawin /></ProtectedRoute>} />
                <Route path="/PugadLawin3d" element={<ProtectedRoute><PugadLawin3d /></ProtectedRoute>} />
                <Route path="/PugadLawin3d2" element={<ProtectedRoute><PugadLawin3d2 /></ProtectedRoute>} />
                <Route path="/Convention" element={<ProtectedRoute><Convention /></ProtectedRoute>} />
                <Route path="/Convention3d" element={<ProtectedRoute><Convention3d /></ProtectedRoute>} />
                <Route path="/Convention3d2" element={<ProtectedRoute><Convention3d2 /></ProtectedRoute>} />
                <Route path="/Kasunduan" element={<ProtectedRoute><Kasunduan /></ProtectedRoute>} />
                <Route path="/Kasunduan3d" element={<ProtectedRoute><Kasunduan3d /></ProtectedRoute>} />
                <Route path="/Kasunduan3d2" element={<ProtectedRoute><Kasunduan3d2 /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>        
        </div>
      </Router>
      </RewardProvider>
      </MarkedTopicsProvider>
      </ScrollContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
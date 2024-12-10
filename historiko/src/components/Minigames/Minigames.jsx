import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App'; // Import the useAuth hook
import './Minigames.css';
import gg from '../../assets/gg.png';
import gg2 from '../../assets/gg2.png';
import gamebg from '../../assets/gamebg.jpg';
import vf from '../../assets/vf.png';
import GuessGame from '../GuessGame/GuessGame';
import GuessGame2 from '../GuessGame/GuessGame2';
import FlashCard from '../GuessGame/FlashCard';
import bg6 from '../../assets/6.png'
import bg5 from '../../assets/5.png'
import bg4 from '../../assets/4.png'
import bg3 from '../../assets/3.png'

const Minigame = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFlashcardCompleted, setIsFlashcardCompleted] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const [userScores, setUserScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth(); // Use the authentication context
  const navigate = useNavigate();

  const fetchUserScores = async () => {
    try {
      const { data, error } = await supabase
        .from('user_scores')
        .select(`
          user_id,
          guess_game_score,
          updated_at,
          users (username)
        `)
        .order('guess_game_score', { ascending: false });

      if (error) throw error;

      setUserScores(data);
    } catch (error) {
      console.error('Error fetching user scores:', error);
    }
  };

  const checkFlashcardCompletion = async () => {
    if (isAuthenticated && user) {
      setIsLoading(true);
      try {
        console.log('Checking flashcard completion for user:', user.id);
        const { data, error } = await supabase
          .from('users')
          .select('flashcard_completed')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        console.log('Flashcard completion data:', data);
        setIsFlashcardCompleted(data?.flashcard_completed || false);
        console.log('Updated isFlashcardCompleted:', data?.flashcard_completed || false);
      } catch (error) {
        console.error('Error checking flashcard completion:', error);
        setIsFlashcardCompleted(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkFlashcardCompletion();
  }, [isAuthenticated, user]);

  const toggleDashboard = async () => {
    navigate('/StudentDashboard');
  };

  const handleGameClick = (game) => {

      setSelectedGame(game);
    
  };

  const backToSelection = () => {
    setSelectedGame(null);
  };

  const handleFlashcardComplete = async () => {
    if (user) {
      await checkFlashcardCompletion();
      backToSelection();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to access the minigames.</div>;
  }
  
  if ((selectedGame === 'guessGame') || (localStorage.getItem('gamechosen') === 'guessGame')) {
    return (
      <div className="minigame-container">
        <GuessGame />
      </div>
    );
  }
  




  if (selectedGame === 'guessGame2') {
    return (
      <div className="minigame-container">
        <GuessGame2 />
      </div>
    );
  }

  if (selectedGame === 'flashcard') {
    return (
      <div className="minigame-container">
        <img src={bg6} className="bg1" alt='main backgroud'/>
        <img src={bg5} className="bg2" alt='table backgroud'/>
        <img src={bg4} className="bg3" alt='paperplane backgroud'/>
        <img src={bg3} className="bg4" alt='character backgroud'/>
        <FlashCard onComplete={handleFlashcardComplete} />
      </div>
    );
  }

  return (
    <div className="minigame-wrapper">
      <div className="minigame-container">
        <button className="game-butt" onClick={toggleDashboard}>
          Student Dashboard
        </button>
      <img src={gamebg} alt='minigame-bg' className='minigame-bg' />
      <div className="game-area">
        <div className="virtual-flashcard" onClick={() => handleGameClick('flashcard')}>
          <h2>Magbalik aral gamit ang FlashCard</h2>
          <img src={vf} alt='background' className='virtual-bg'/>
        </div>
        <div className={`guess-game`} onClick={() => handleGameClick('guessGame')}>
          <h2>Pag susulit sa Panahon ng Himagsikang Pilipino</h2>
          <img src={gg} alt="Character" className="character-image" />
         
        </div>
        <div className={`guess-game`} onClick={() => handleGameClick('guessGame2')}>
          <h2>Pag susulit sa Panahon ng Digmaang Pilipino-Amerikano</h2>
          <img src={gg2} alt="Character" className="character-image" />
        
        </div>
      </div>
      </div>
    </div>
  );
};

export default Minigame;
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './Minigames.css';
import character from '../../assets/question.png';
import gamebg from '../../assets/gamebg.jpg';
import back1 from '../../assets/back1.png';
import GuessGame from '../GuessGame/GuessGame';
import GuessGame2 from '../GuessGame/GuessGame2';
import FlashCard from '../GuessGame/FlashCard';

const Minigame = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFlashcardCompleted, setIsFlashcardCompleted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await checkFlashcardCompletion(user.id);
      }
    };
    fetchUserAndProgress();
  }, []);

  // Update to check the new `gameuser_progress` table
  const checkFlashcardCompletion = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('gameuser_progress') // Update to new table name
        .select('flashcard_completed')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      setIsFlashcardCompleted(data?.flashcard_completed || false);
    } catch (error) {
      console.error('Error checking flashcard completion:', error);
    }
  };

  const handleGameClick = (game) => {
    if (game === 'flashcard' || isFlashcardCompleted) {
      setSelectedGame(game);
    } else {
      alert('Please complete the Virtual Flashcard game first!');
    }
  };

  const backToSelection = () => {
    setSelectedGame(null);
  };

  const handleFlashcardComplete = async () => {
    if (user) {
      await checkFlashcardCompletion(user.id);
      setIsFlashcardCompleted(true); // Ensure the state is updated
      backToSelection();
    }
  };

  if (selectedGame === 'guessGame') {
    return (
      <div className="minigame-container">
        <button className="back-button" onClick={backToSelection}>Back to Minigames</button>
        <GuessGame />
      </div>
    );
  }

  if (selectedGame === 'guessGame2') {
    return (
      <div className="minigame-container">
        <button className="back-button" onClick={backToSelection}>Back to Minigames</button>
        <GuessGame2 />
      </div>
    );
  }

  if (selectedGame === 'flashcard') {
    return (
      <div className="minigame-container">
        <button className="back-button" onClick={backToSelection}>Back to Minigames</button>
        <FlashCard onComplete={handleFlashcardComplete} />
      </div>
    );
  }

  return (
    <div className="minigame-container">
      <img src={gamebg} alt='minigame-bg' className='minigame-bg' />
      <div className="game-area">
        <div className="virtual-flashcard" onClick={() => handleGameClick('flashcard')}>
          <h2>Virtual Flashcard</h2>
          <img src={back1} alt='background' className='virtual-bg'/>
        </div>
        <div className={`guess-game ${!isFlashcardCompleted ? 'locked' : ''}`} onClick={() => handleGameClick('guessGame')}>
          <h2>Pag susulit sa Panahon ng himagsikang Pilipino</h2>
          <img src={character} alt="Character" className="character-image" />
          {!isFlashcardCompleted && <div className="lock-overlay">🔒</div>}
        </div>
        <div className={`guess-game ${!isFlashcardCompleted ? 'locked' : ''}`} onClick={() => handleGameClick('guessGame2')}>
          <h2>Pag susulit sa Panahon ng Digmaang Pilipino-Amerikano</h2>
          <img src={character} alt="Character" className="character-image" />
          {!isFlashcardCompleted && <div className="lock-overlay">🔒</div>}
        </div>
      </div>
    </div>
  );
};

export default Minigame;
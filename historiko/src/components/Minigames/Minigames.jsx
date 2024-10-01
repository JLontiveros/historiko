import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App'; // Import the useAuth hook
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
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth(); // Use the authentication context

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
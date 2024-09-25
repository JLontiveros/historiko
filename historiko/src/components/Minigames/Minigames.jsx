import React, { useState } from 'react';
import './Minigames.css';
import character from '../../assets/question.png';
import gamebg from '../../assets/gamebg.jpg';
import back1 from '../../assets/back1.png';
import GuessGame from '../GuessGame/GuessGame';
import GuessGame2 from '../GuessGame/GuessGame2'; // Import the new GuessGame2 component

const Minigame = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const backToSelection = () => {
    setSelectedGame(null);
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
        <h2>Flashcard Game Coming Soon!</h2>
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
        <div className="guess-game" onClick={() => handleGameClick('guessGame')}>
          <h2>Pag susulit sa Panahon ng himagsikang Pilipino</h2>
          <img src={character} alt="Character" className="character-image" />
        </div>
        <div className="guess-game" onClick={() => handleGameClick('guessGame2')}>
          <h2>Pag susulit sa Panahon ng Digmaang Pilipino-Amerikano</h2>
          <img src={character} alt="Character" className="character-image" />
        </div>
      </div>
    </div>
  );
};

export default Minigame;
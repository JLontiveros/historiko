import React from 'react';
import './Minigames.css';
import character from '../../assets/question.png'
import gamebg from '../../assets/gamebg.jpg'

const Minigame = () => {
  return (
    <div className="minigame-container" style={{ backgroundImage: `url(${gamebg})` }}>
      <div className="game-area">
        <div className="virtual-flashcard">
          <h2>Virtual Flashcard</h2>
          {/* Flashcard content will go here */}
        </div>
        <div className="guess-game">
          <h2>Guess Game</h2>
          <img src={character} alt="Character" className="character-image" />
        </div>
      </div>
      <button className="play-button">Play</button>
    </div>
  );
};

export default Minigame;
import React from 'react';
import './Minigames.css';
import character from '../../assets/question.png';
import gamebg from '../../assets/gamebg.jpg';
import back1 from '../../assets/back1.png';

const Minigame = () => {
  return (
    <div className="minigame-container">
      <img src={gamebg} alt='minigame-bg' className='minigame-bg' />
      <div className="game-area">
        <div className="virtual-flashcard">
          <h2>Virtual Flashcard</h2>
          <img src={back1} alt='background' className='virtual-bg'/>
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
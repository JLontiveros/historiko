// src/components/Modules/Modules.jsx
import React from 'react';
import './Modules.css';
import flagsImage from '../../assets/flag.png';
import axesImage from '../../assets/axe.png';
import characterImage from '../../assets/boyinverted.png';
import questionMark from '../../assets/mark.png';

function Modules() {
  return (
    <div className="modules">
      <div className="module-container">
        <div className="module">
          <img src={flagsImage} alt="US and Philippines flags" className="module-icon" />
          <h2>Panahon ng Digmaang Pilipino-Amerikano</h2>
          <ul>
            <li><img src={questionMark} alt="Question mark" className="question-mark" />Unang Putok sa panlulukan ng Silencio at Sociego, Sta.Mesa</li>
            <li><img src={questionMark} alt="Question mark" className="question-mark" />Labanan sa Tirad Pass</li>
            <li><img src={questionMark} alt="Question mark" className="question-mark" />Balangiga Massacre</li>
          </ul>
          <button>EXPLORE</button>
        </div>
        <div className="module">
          <img src={axesImage} alt="Crossed axes" className="module-icon" />
          <h2>Panahon ng Himagsikang Pilipino</h2>
          <ul>
            <li><img src={questionMark} alt="Question mark" className="question-mark" />Sigaw ng Pugad-Lawin</li>
            <li><img src={questionMark} alt="Question mark" className="question-mark" />Tejeros Convention</li>
            <li><img src={questionMark} alt="Question mark" className="question-mark" />Kasunduan sa Biak-na-Bato</li>
          </ul>
          <button>EXPLORE</button>
        </div>
      </div>
      <img src={characterImage} alt="Character" className="character" />
    </div>
  );
}

export default Modules;
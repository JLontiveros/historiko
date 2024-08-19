import React from 'react';
import { Link } from 'react-router-dom';
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
          <div className="image-container">
            <img src={flagsImage} alt="US and Philippines flags" className="module-icon" />
          </div>
          <h2>Panahon ng Digmaang Pilipino-Amerikano</h2>
          <ul>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Unang Putok sa panlulukan ng Silencio at Sociego, Sta.Mesa
            </li>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Labanan sa Tirad Pass
            </li>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Balangiga Massacre
            </li>
          </ul>
          <Link to="/Unatalakayin">
            <button>EXPLORE</button>
          </Link>
        </div>
        <div className="module">
          <div className="image-container">
            <img src={axesImage} alt="Crossed axes" className="module-icon" />
          </div>
          <h2>Panahon ng Himagsikang Pilipino</h2>
          <ul>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Sigaw ng Pugad-Lawin
            </li>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Tejeros Convention
            </li>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Kasunduan sa Biak-na-Bato
            </li>
          </ul>
          <Link to="/Dalwatalakayin">
            <button>EXPLORE</button>
          </Link>
        </div>
      </div>
      <img src={characterImage} alt="Character" className="character" />
    </div>
  );
}

export default Modules;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Modules.css';
import flagsImage from '../../assets/flag.png';
import axesImage from '../../assets/axe.png';
import characterImage from '../../assets/boyinverted.png';
import questionMark from '../../assets/mark.png';

function Modules() {
  const [hoverText1, setHoverText1] = useState(false);
  const [hoverText2, setHoverText2] = useState(false);

  return (
    <div className="modules">
      <div className="module-container">
        <div className="module">
          <div className="image-container">
            <img src={flagsImage} alt="US and Philippines flags" className="module-icon" />
          </div>
          <div className="title-container"
               onMouseEnter={() => setHoverText1(true)}
               onMouseLeave={() => setHoverText1(false)}>
            <h2>Panahon ng Digmaang Pilipino-Amerikano</h2>
            {hoverText1 && <div className="hover-text">Ang armadong hidwaan sa pagitan ng Unang Republikang Pilipino at ng Estados Unidos na tumagal mula Pebrero 4, 1899 hanggang Hulyo 2, 1902. Ang naturang digmaan ay pagpapatuloy ng pakikibaka ng mga Pilipino para sa Kalayaan na nagsimula noong 1896 sa pagsiklab ng Himagsikang Pilipino</div>}
          </div>
          <ul>
            <li>
              <div className="image-container">
                <img src={questionMark} alt="Question mark" className="question-mark" />
              </div>
              Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa
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
          <div className="title-container"
               onMouseEnter={() => setHoverText2(true)}
               onMouseLeave={() => setHoverText2(false)}>
            <h2>Panahon ng Himagsikang Pilipino</h2>
            {hoverText2 && <div className="hover-text">Nasusuri ang mga dahilan at pangyayaring naganap sa Panahong ng Himagsikang Pilipino</div>}
          </div>
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
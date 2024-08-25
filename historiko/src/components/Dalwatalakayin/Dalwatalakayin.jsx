import React from 'react';
import { Link } from 'react-router-dom';
import './Dalwatalakayin.css';
import Navbar from '../Navbar/Navbar';
import bellsImage from '../../assets/bato.png';
import plaquetteImage from '../../assets/sigaw.jpg';
import swordsImage from '../../assets/tejeros.png';

function Dalwatalakayin() {
  return (
    <div className="dalwatalakayin">
      <Navbar />
      <h1>Mga Talakayin</h1>
      <div className="events-container">
        <div className="event">
          <img src={plaquetteImage} alt="firstshot" className="event-icon" />
          <h2>Sigaw ng Pugad-Lawin</h2>
          <p>makasaysayang sandali kung saan pinagpunit ng mga Katipunero ang kanilang mga sedula bilang simbolo ng pagtalikod sa Espanya. Dito nagsimula ang kanilang armadong paghihimagsik para sa kalayaan ng Pilipinas.</p>
          <Link to="/sigaw" className="link-button">See more</Link>
        </div>
        <div className="event">
          <img src={swordsImage} alt="sword" className="event-icon" />
          <h2>Tejeros Convention</h2>
          <p>pagpupulong na naganap noong 1897, kung saan nagtipun-tipon ang mga rebolusyonaryong Pilipino upang talakayin ang pagkakaroon ng isang pamahalaang rebolusyonaryo. Dito, nahalal si Emilio Aguinaldo bilang pangulo, na nagbigay-daan sa mahigpit na alitan sa pagitan ng mga paksiyon ng Katipunan at nagmarka ng isang mahalagang yugto sa pakikibaka para sa kalayaan ng Pilipinas.</p>
          <Link to="/tejeros" className="link-button">See more</Link>
        </div>
        <div className="event">
          <img src={bellsImage} alt="Bell" className="event-icon" />
          <h2>Kasunduan sa Biak-na-Bato</h2>
          <p>Disyembre 14, 1897, nilagdaan ang Kasunduan sa Biak-na-Bato, na naglalayong tapusin ang himagsikan sa pagitan ng mga rebolusyonaryong Pilipino at pamahalaang Espanyol. Sa ilalim ng kasunduang ito, pumayag si Emilio Aguinaldo at ang kanyang mga kasamahan na magtungo sa Hong Kong kapalit ng bayad na mula sa Espanya, ngunit hindi nito tuluyang napigilan ang paghahangad ng mga Pilipino para sa kalayaan.</p>
          <Link to="/bato" className="link-button">See more</Link>
        </div>
      </div>
    </div>
  );
}

export default Dalwatalakayin;
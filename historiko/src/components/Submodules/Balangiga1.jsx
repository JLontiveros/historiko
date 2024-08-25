import React from 'react';
import './Balangiga1.css';
import kidst from '../../assets/kidst.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';

const Balangiga = () => {
  return (
    <div>
      <>
      <div className="balangiga">
        <div className="balangiga-description-container">
          <h1>Description:</h1>
          <p>Ang labanan ay isang operasyon militar na binalak ni Kapitan Eugenio Daza ng Area Commander ng mga pwersa ni Vicente Lukban patungong Southeastern Samar, na naganap sa Balangiga noong 1901 sa panahon ng Digmaang Pilipino at Amerikano. Ang pagsalakay ay pinamunuan ni Valeriano Abanador na Jefe de la Policia (Chief of Police).</p>
        </div>
        <div className="balangiga-image-container">
          <img src={kidst} className='first-image'/>
          <img src={kidst} className='second-image'/>
          <img src={kidst} className='third-image'/>
        </div>
        <div className="balangiga-arrow-keys">
          <img src={arrownav2} alt='left'/>
          <img src={arrownav} alt='right' className='arrow-right'/>
        </div>
      </div>
      </>
    </div>
  )
}

export default Balangiga

import React from 'react';
import './About.css';
import characterImage from '../../assets/boycropped.png';
import roombg from '../../assets/roombg.png';

const About = () => {
  return (
    <div className='about'>
      <img src={roombg} alt='background' className='about-bg'/>
      <div className='content'>
        <h1>Patungkol sa Historiko</h1>
        <div className='box'>
          <p>Maligayang pagdating sa Historiko! Kami ay isang pangkat na naglalayong palakasin ang diwa ng History sa pamamagitan ng pag-aaral ng kasaysayan ng Pilipinas, partikular sa:</p>
          <p className='one'>1. <b>Digmaang Pilipino-Amerikano</b></p>
          <div className='bullet'>
            <p>-Unang Putok sa panukulan ng Silencio at Sociego, Sta Mesa</p>
            <p>-Labanan sa Tirad Pass </p> 
            <p>-Balangiga Massacre</p>
          </div>
          <p className='two'>2. <b>Himagsikang Pilipino</b></p>
          <div className='bullet2'>
            <p>-Sigaw ng Pugad-Lawin</p>
            <p>-Tejeros Convention</p>
            <p>-Kasunduan sa Biak-na-Bato</p>
          </div>
          <h2><b>Layunin:</b></h2>
          <div className='layunin'>
            <ul>
              <li>Edukasyon: Magbigay ng makabuluhan at kawili-wiling impormasyon.</li>
              <li>Inspirasyon: Hikayatin ang pagmamalaki sa ating pinagmulan.</li>
              <li>Pagkakaisa: Palakasin ang pagmamahal sa bayan.</li>
            </ul>
          </div>
        </div>
        <img src={characterImage} alt="Character" className="man" />
      </div>
    </div>
  )
}

export default About;
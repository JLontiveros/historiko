import React from 'react';
import './TopicMarking.css';
import heart from '../../assets/heart.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import bookmark from '../../assets/bookmark.png';

const TopicMarking = () => {
  return (
    <>
    <div className="topic-marking">
        <h1>Topic Marking</h1>
        <div className="topic-container">
            <img src={arrownav2} alt='right'/>
            <div className="card1">
                <img src={heart} />
                <h2>Sigaw ng Pugad-Lawin</h2>
            </div>
            <div className="card2">
                <img src={heart} />
                <h2>Labanan sa Tirad Pass</h2>
            </div>
            <div className="card3">
                <img src={heart} />
                <h2>Balangiga Massacre</h2>
            </div>
            <div className="card4">
                <img src={heart} />
                <h2>Kasunduan sa Biak-na-Bato</h2>
            </div>
            <img src={arrownav} alt='right' className='arrow-right'/>
        </div>
    </div>

    <div className="bookmark">
        <img src={bookmark} className='bookmark' />
        <img src={bookmark} className='bookmark2' />
        <img src={bookmark} className='bookmark3' />
        <img src={bookmark} className='bookmark4' />
    </div>
    </>
  )
}

export default TopicMarking
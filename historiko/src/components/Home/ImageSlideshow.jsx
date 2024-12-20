import React, { useState, useEffect } from 'react';
import ChatBox from '../Chat/ChatBot';
import './ImageSlideshow.css';

const ImageSlideshow = ({ images, onRendered }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    onRendered();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`slideshow-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    <ChatBox /> 
</div>
  );       


};

export default ImageSlideshow;
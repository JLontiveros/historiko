import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './TopicMarking.css';
import heartIcon from '../../assets/heart.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import { useMarkedTopics } from '../context/MarkedTopicsContext';

const TopicMarking = () => {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { markedTopics } = useMarkedTopics();
  
    useEffect(() => {
      fetchTopics();
    }, []);
  
    const fetchTopics = async () => {
        try {
          const { data, error } = await supabase
            .from('topics')
            .select('id, topic_name');
          
          if (error) throw error;
          setTopics(data);
        } catch (error) {
          console.error('Error fetching topics:', error.message);
          setError('Failed to fetch topics. Please try again later.');
        }
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
          prevIndex > 0 ? prevIndex - 1 : Math.max(markedTopics.length - 4, 0)
        );
      };
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) => 
          prevIndex < Math.max(markedTopics.length - 4, 0) ? prevIndex + 1 : 0
        );
      };
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      const displayedTopics = [...markedTopics, ...topics.filter(topic => !markedTopics.some(markedTopic => markedTopic.id === topic.id))];
    
      return (
      <>
        <div className="topic-marking">
        <h1>Topic Marking</h1>
        {markedTopics.length === 0 ? (
          <div className="no-topics-message">
            No topics marked yet. Heart a topic to see it here!
          </div>
        ) : (
          <div className="topic-container">
            <img src={arrownav2} onClick={handlePrev} className="arrow left-arrow"/>
            <div className="topics-wrapper">
              <div className="topics-slider" style={{
                transform: `translateX(-${currentIndex * 25}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}>
                {markedTopics.map((topic) => (
                  <div key={topic.id} className="topic-card">
                    <div className="bookmark">
                      <img src={heartIcon} alt="heart" className="heart"/>
                    </div>
                    <h2>{topic.topic_name}</h2>
                  </div>
                ))}
              </div>
            </div>
            <img src={arrownav} onClick={handleNext} className="arrow right-arrow"/>
          </div>
        )}
      </div>
      </>
    );
  }

export default TopicMarking;
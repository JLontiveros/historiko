import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './TopicMarking.css';
import heartIcontopic from '../../assets/heart.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';
import { useMarkedTopics } from '../context/MarkedTopicsContext';
import { useAuth } from '../../App';

const TopicMarking = () => {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { markedTopics, addMarkedTopic, removeMarkedTopic, isLoading } = useMarkedTopics();
    const [isTopicsLoading, setIsTopicsLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (userId) {
          fetchTopics();
      }
  }, [userId]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                console.log('Parsed user data:', userData);
                setUserId(userData.id);
            } catch (error) {
                console.error('Error parsing user data:', error);
                setError('Error retrieving user data. Please log in again.');
            }
        }
    }, []);

    const fetchTopics = async () => {
        if (!userId) {
            console.log('No user ID available, skipping fetch');
            setIsTopicsLoading(false);
            return;
        }

        try {
            console.log('Fetching topics for user ID:', userId);
            const { data, error } = await supabase
                .from('user_topics')
                .select('id, topic_name')
                .eq('user_id', userId);

            if (error) throw error;
            console.log('Fetched topics:', data);
            setTopics(data);
        } catch (error) {
            console.error('Error fetching topics:', error.message);
            setError('Failed to fetch topics. Please try again later.');
        } finally {
            setIsTopicsLoading(false);
        }
    };

    const handleMarkTopic = async (topic) => {
      if (!isAuthenticated) {
        setError('Please log in to mark topics.');
        return;
      }

      if (!topic || !topic.id || !topic.topic_name) {
        console.error('Invalid topic data:', topic);
        setError('Invalid topic data. Please try again.');
        return;
      }

      const isMarked = markedTopics.some(markedTopic => markedTopic.id === topic.id);

      try {
        if (isMarked) {
          await removeMarkedTopic(topic.id, topic.topic_name);
        } else {
          await addMarkedTopic(topic.topic_name, topic.id);
        }
      } catch (error) {
        console.error('Error marking/unmarking topic:', error);
        setError();
      }
    };
    
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    };
    
    const handleNext = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex < displayedTopics.length - 1 ? prevIndex + 1 : prevIndex
      );
    };
    
    if (isLoading || isTopicsLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }
    
    const displayedTopics = [
      ...markedTopics,
      ...topics.filter(topic => !markedTopics.some(markedTopic => markedTopic.topic_name === topic.topic_name))
    ];
    
    return (
      <>
      <div className="topic-marking">
        <h1>Topic Marking</h1>
        {error && <div className="error-message">{error}</div>}
        {!isAuthenticated ? (
          <div className="login-message">
            Please log in to mark and view your topics.
          </div>
        ) : displayedTopics.length === 0 ? (
          <div className="no-topics-message">
            No topics available.
          </div>
        ) : (
          <div className="topic-container">
            <img 
              src={arrownav2} 
              onClick={handlePrev} 
              className={`arrow left-arrow ${currentIndex === 0 ? 'disabled' : ''}`}
              alt="Previous"
            />
          <div className="topics-wrapper">
            <div 
              className="topics-slider" 
              style={{
                '--current-index': currentIndex
              }}
            >
              {displayedTopics.map((topic) => (
                <div key={topic.id} className="topic-card">
                  <div className="bookmark" onClick={() => handleMarkTopic(topic)}>
                    <img 
                      src={heartIcontopic} 
                      alt="heart" 
                      className={`heart ${markedTopics.some(markedTopic => markedTopic.id === topic.id) ? 'marked' : ''}`}
                    />
                  </div>
                  <h2>{topic.topic_name}</h2>
                </div>
              ))}
            </div>
          </div>
            <img 
              src={arrownav} 
              onClick={handleNext} 
              className={`arrow right-arrow ${currentIndex >= displayedTopics.length - 4 ? 'disabled' : ''}`}
              alt="Next"
            />
          </div>
        )}
      </div>
    </>
    );
}

export default TopicMarking;
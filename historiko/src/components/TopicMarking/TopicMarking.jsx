import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { useMarkedTopics } from '../context/MarkedTopicsContext';
import './TopicMarking.css';
import heartIcontopic from '../../assets/heart.png';
import arrownav from '../../assets/arrownav (2).png';
import arrownav2 from '../../assets/arrownav.png';

const TopicMarking = () => {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { markedTopics, isLoading: isMarkedTopicsLoading, fetchMarkedTopics } = useMarkedTopics();
    const [isTopicsLoading, setIsTopicsLoading] = useState(true);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTopics = async () => {
          if (isAuthenticated && user) {
            setIsLoading(true);
            try {
              await Promise.all([
                fetchTopics(user.id),
                fetchMarkedTopics(user.id)
              ]);
            } catch (error) {
              console.error('Error loading topics:', error);
              setError('Failed to load topics. Please try again later.');
            } finally {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            setTopics([]);
          }
        };
    
        loadTopics();
      }, [isAuthenticated, user, fetchMarkedTopics]);

    const fetchTopics = async (userId) => {
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

    const handleTopicClick = (topic) => {
        const topicRoutes = {
            'Unang Putok sa panulukan ng Silencio at Sociego, Sta.Mesa': '/unangputok',
            'Labanan sa Tirad Pass': '/tiradpass',
            'Balangiga Massacre': '/balangiga',
            'Sigaw ng Pugad Lawin': '/Sigaw',
            'Tejeros Convention': '/tejeros',
            'Kasunduan sa Biak-na-Bato': '/bato'
        };

        const route = topicRoutes[topic.topic_name];
        if (route) {
            navigate(route);
        } else {
            console.error('No matching route for topic:', topic.topic_name);
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
    
    if (isLoading) {
        return <div>Loading topics...</div>;
      }

    const displayedTopics = [...markedTopics];
    topics.forEach(topic => {
        if (!displayedTopics.some(displayedTopic => displayedTopic.topic_id === topic.topic_id)) {
            displayedTopics.push(topic);
    }
});

    console.log("Displayed topics:", displayedTopics);
    
    return (
        <>
        <div className="topic-marking">
            <h1>Mga Namarkahan na Paksa</h1>
            {error && <div className="error-message">{error}</div>}
            {!isAuthenticated ? (
                <div className="login-message">
                    Please log in to mark and view your topics.
                </div>
            ) : displayedTopics.length === 0 ? (
                <div className="no-topics-message">
                    Wala pang namamarkahan.
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
                                <div key={topic.id} className="topic-card" onClick={() => handleTopicClick(topic)}>
                                    <div className="bookmark">
                                        <img onClick={() => handleTopicClick(topic)}
                                            src={heartIcontopic} 
                                            alt="heart" 
                                            className={`heart ${markedTopics.some(markedTopic => markedTopic.topic_id === topic.topic_id) ? 'marked' : ''}`}
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
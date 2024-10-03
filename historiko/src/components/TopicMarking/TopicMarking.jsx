import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const { markedTopics, isLoading: isMarkedTopicsLoading, fetchMarkedTopics } = useMarkedTopics();
    const [isTopicsLoading, setIsTopicsLoading] = useState(true);
    const { isAuthenticated, user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        console.log("Authentication state:", { isAuthenticated, user, authLoading });
        if (!authLoading && isAuthenticated && user) {
            fetchTopics();
            fetchMarkedTopics(user.id);
        } else if (!authLoading) {
            setIsTopicsLoading(false);
        }
    }, [isAuthenticated, user, authLoading, fetchMarkedTopics]);

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
    
    if (authLoading || isMarkedTopicsLoading || isTopicsLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const displayedTopics = [
        ...markedTopics,
        ...topics.filter(topic => !markedTopics.some(markedTopic => markedTopic.id === topic.id))
    ];

    console.log("Displayed topics:", displayedTopics);
    
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
                                <div key={topic.topic_id} className="topic-card" onClick={() => handleTopicClick(topic)}>
                                    <div className="bookmark">
                                        <img onClick={() => handleTopicClick(topic)}
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
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';

const MarkedTopicsContext = createContext();

export const MarkedTopicsProvider = ({ children }) => {
  const [markedTopics, setMarkedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user && user.id) {
      fetchMarkedTopics(user.id);
    } else {
      setMarkedTopics([]);
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchMarkedTopics = async (userId) => {
    if (!userId) {
      console.error('No user ID provided for fetching marked topics');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_topics')
        .select('topic_id, topic_name')
        .eq('user_id', userId);

      if (error) throw error;

      setMarkedTopics(data.map(item => ({ id: item.topic_id, topic_name: item.topic_name })));
    } catch (error) {
      console.error('Error fetching marked topics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMarkedTopic = async (topicName, topicId) => {
    if (!isAuthenticated || !user || !user.id) return;
  
    if (!topicName || typeof topicName !== 'string' || topicName.trim() === '') {
      console.error('Invalid topicName provided:', topicName);
      return;
    }

    if (!topicId) {
      console.error('Invalid topicId provided:', topicId);
      return;
    }
  
    try {
      const { error } = await supabase
        .from('user_topics')
        .insert({ 
          user_id: user.id, 
          topic_id: topicId, 
          topic_name: topicName,
          marked_at: new Date().toISOString(),
          status: 'to_review'
        });
  
      if (error) throw error;
  
      setMarkedTopics(prev => [...prev, { id: topicId, topic_name: topicName }]);
    } catch (error) {
      console.error('Error adding marked topic:', error);
    }
  };

  const removeMarkedTopic = async (topicId) => {
    if (!isAuthenticated || !user || !user.id) return;
  
    if (!topicId) {
      console.error('Invalid topicId provided:', topicId);
      return;
    }
  
    try {
      const { error } = await supabase
        .from('user_topics')
        .delete()
        .eq('user_id', user.id)
        .eq('topic_id', topicId);
  
      if (error) throw error;
  
      setMarkedTopics(prev => prev.filter(topic => topic.id !== topicId));
    } catch (error) {
      console.error('Error removing marked topic:', error);
    }
  };

  return (
    <MarkedTopicsContext.Provider value={{ 
      markedTopics, 
      addMarkedTopic, 
      removeMarkedTopic,
      isLoading
    }}>
      {children}
    </MarkedTopicsContext.Provider>
  );
};

export const useMarkedTopics = () => useContext(MarkedTopicsContext);
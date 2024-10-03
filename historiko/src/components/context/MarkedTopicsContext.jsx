import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';

const MarkedTopicsContext = createContext();

export const MarkedTopicsProvider = ({ children }) => {
  const [markedTopics, setMarkedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  const fetchMarkedTopics = useCallback(async (userId) => {
    if (!userId) {
      console.log('No user ID provided, skipping fetch');
      setMarkedTopics([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Fetching marked topics for user ID:', userId);
      const { data, error } = await supabase
        .from('user_topics')
        .select('topic_id, topic_name')
        .eq('user_id', userId);

      if (error) throw error;

      console.log('Fetched marked topics:', data);
      setMarkedTopics(data.map(item => ({ id: item.topic_id, topic_name: item.topic_name })));
    } catch (error) {
      console.error('Error fetching marked topics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user && user.id) {
      fetchMarkedTopics(user.id);
    } else {
      setMarkedTopics([]);
      setIsLoading(false);
    }
  }, [isAuthenticated, user, fetchMarkedTopics]);

  const addMarkedTopic = async (topicName, topicId, userId) => {
    console.log('Adding marked topic:', { topicName, topicId, userId });
    if (!userId) {
      console.error('No user ID provided for adding marked topic');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('user_topics')
        .insert({ 
          user_id: userId, 
          topic_id: topicId, 
          topic_name: topicName,
          marked_at: new Date().toISOString(),
          status: 'to_review'
        });
  
      if (error) throw error;
  
      console.log('Marked topic added successfully:', data);
      setMarkedTopics(prev => [...prev, { id: topicId, topic_name: topicName }]);
    } catch (error) {
      console.error('Error adding marked topic:', error);
      throw error;
    }
  };

  const removeMarkedTopic = async (topicId) => {
    if (!user || !user.id) return;
  
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
      throw error;
    }
  };

  return (
    <MarkedTopicsContext.Provider value={{ 
      markedTopics, 
      addMarkedTopic, 
      removeMarkedTopic,
      isLoading,
      fetchMarkedTopics
    }}>
      {children}
    </MarkedTopicsContext.Provider>
  );
};

export const useMarkedTopics = () => useContext(MarkedTopicsContext);
import React, { createContext, useState, useContext } from 'react';

const MarkedTopicsContext = createContext();

export const MarkedTopicsProvider = ({ children }) => {
  const [markedTopics, setMarkedTopics] = useState([]);

  const addMarkedTopic = (topic_name) => {
    setMarkedTopics((prevTopics) => [...prevTopics, topic_name]);
  };

  const removeMarkedTopic = (topicId) => {
    setMarkedTopics((prevTopics) => prevTopics.filter(topic => topic.id !== topicId));
  };

  return (
    <MarkedTopicsContext.Provider value={{ markedTopics, addMarkedTopic, removeMarkedTopic }}>
      {children}
    </MarkedTopicsContext.Provider>
  );
};

export const useMarkedTopics = () => useContext(MarkedTopicsContext);
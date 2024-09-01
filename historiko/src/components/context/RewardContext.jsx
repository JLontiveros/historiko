import React, { createContext, useContext } from 'react';
import { supabase } from '../../supabaseClient';

const RewardContext = createContext();

export const RewardProvider = ({ children }) => {
  const saveReward = async (rewardId, userId) => {
    try {
      const { data, error } = await supabase
        .from('user_reward')
        .insert([
          { 
            reward_id: rewardId,
            user_id: userId,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      
      return { success: true, message: "Reward saved successfully", data };
    } catch (error) {
      console.error('Error saving reward:', error);
      return { success: false, message: "Failed to save reward" };
    }
  };

  return (
    <RewardContext.Provider value={{ saveReward }}>
      {children}
    </RewardContext.Provider>
  );
};

export const useReward = () => {
  const context = useContext(RewardContext);
  if (context === undefined) {
    throw new Error('useReward must be used within a RewardProvider');
  }
  return context;
};

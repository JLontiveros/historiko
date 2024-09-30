import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App'; // Import the custom useAuth hook
import './FlashCard.css';

const FlashCard = ({ onComplete }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const fetchFlashcards = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('reviewer')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      setFlashcards(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      setError('Failed to load flashcards. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchFlashcards();
    }
  }, [fetchFlashcards, isAuthenticated, user]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleComplete = async () => {
    console.log('handleComplete called');
    console.log('Current user:', user);

    if (!isAuthenticated || !user) {
      console.error('No user found. Please ensure you are logged in.');
      return;
    }
  
    try {
      console.log('Attempting to update gameuser_progress for user ID:', user.id);
      const { data, error } = await supabase
        .from('gameuser_progress')
        .upsert(
          {
            user_id: user.id,
            flashcard_completed: true,
            progress: 100,
          },
          { 
            onConflict: 'user_id'
          }
        );
  
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
  
      console.log('Flashcard completion updated successfully', data);
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error updating flashcard completion:', error);
    }
  };

  if (isLoading) return <div>Loading flashcards...</div>;
  if (error) return <div>Error: {error}</div>;
  if (flashcards.length === 0) return <div>No flashcards available.</div>;

  const currentCard = flashcards[currentCardIndex];
  const isLastCard = currentCardIndex === flashcards.length - 1;

  return (
    <div className="flashcard-reviewer">
      <h2>Flashcard Reviewer</h2>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p>{currentCard.description}</p>
            {currentCard.img_url && (
              <img src={currentCard.img_url} alt="Flashcard" className="flashcard-image" />
            )}
          </div>
          <div className="flashcard-back">
            <p>{currentCard.answer}</p>
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrevCard} disabled={currentCardIndex === 0}>Previous</button>
        {!isLastCard && (
          <button onClick={handleNextCard}>Next</button>
        )}
        {isLastCard && (
          <button onClick={handleComplete} className="pagtatapos-button">Pagtatapos</button>
        )}
      </div>
    </div>
  );
};

export default FlashCard;
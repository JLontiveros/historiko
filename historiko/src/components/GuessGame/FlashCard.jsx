import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      console.log('Attempting to update flashcard_completed for user ID:', user.id);
      const { data, error } = await supabase
        .from('users')
        .update({ flashcard_completed: true })
        .eq('id', user.id);
  
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
  
      console.log('Flashcard completion updated successfully', data);
      toast.success("Pagpupugay sa pagtatapos ng Virtual Flashcard!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error updating flashcard completion:', error);
      toast.error("May error sa pag-update ng flashcard completion", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (isLoading) return <div>Loading flashcards...</div>;
  if (error) return <div>Error: {error}</div>;
  if (flashcards.length === 0) return <div>No flashcards available.</div>;

  const currentCard = flashcards[currentCardIndex];
  const isLastCard = currentCardIndex === flashcards.length - 1;

  return (
    <>
    <div className="flash-bg">
      <div className="flashcard-reviewer">
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h2>Pindutin ang litrato para makita ang sagot</h2>
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
          <button onClick={handlePrevCard} disabled={currentCardIndex === 0}>Ibalik</button>
          {!isLastCard && (
            <button onClick={handleNextCard}>Susunod</button>
          )}
          {isLastCard && (
            <button onClick={handleComplete} className="pagtatapos-button">Pagtatapos</button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default FlashCard;
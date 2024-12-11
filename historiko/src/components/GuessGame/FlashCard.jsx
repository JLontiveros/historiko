import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FlashCard.css';
import { useNavigate } from 'react-router-dom';

const FlashCard = ({ onComplete }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(() => {
    // Initialize from localStorage if available, otherwise start at 0
    const savedIndex = localStorage.getItem('lastFlashcardIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
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

      // Validate saved index against actual data length
      const savedIndex = parseInt(localStorage.getItem('lastFlashcardIndex'), 10);
      if (savedIndex && savedIndex >= 0 && savedIndex < data.length) {
        setCurrentCardIndex(savedIndex);
      }
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

  // Save current index to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lastFlashcardIndex', currentCardIndex.toString());
  }, [currentCardIndex]);

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

  const skiptogame = () => {
    // Check if 'gamechosen' is already set in localStorage
    if (!localStorage.getItem('gamechosen')) {
      // If it's not set, create it and set it to 'guessGame'
      localStorage.setItem('gamechosen', 'guessGame');
      console.log('gamechosen set to guessGame');
    }
  
    // Now, check if 'gamechosen' is 'guessGame'
    if (localStorage.getItem('gamechosen') === 'guessGame') {
      console.log('Guess game is chosen!');
      
      // Example of creating something, e.g., a new element:
      const newElement = document.createElement('div');
      newElement.textContent = 'Welcome to the Guess Game!';
      document.body.appendChild(newElement);
    }
  };
  



  


  const handleComplete = async () => {
    if (!isAuthenticated || !user) {
      console.error('No user found. Please ensure you are logged in.');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ flashcard_completed: true })
        .eq('id', user.id);
  
      if (error) throw error;
  
      // Clear the saved index when completing the flashcards
      localStorage.removeItem('lastFlashcardIndex');
      
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
        <button type="button"  onClick={() => { 
     skiptogame();
     const navigate = useNavigate();
     navigate(0); 
  }}>Skip to Quiz</button>
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
  );
};

export default FlashCard;

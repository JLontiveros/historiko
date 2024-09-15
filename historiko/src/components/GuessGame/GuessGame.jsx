import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { supabase } from '../../supabaseClient';
import './GuessGame.css';

const GuessGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const fetchQuestions = useCallback(async () => {
    const { data, error } = await supabase
      .from('guess_game_questions')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching questions:', error);
    } else {
      setQuestions(data);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuestions();
    } else {
      navigate('/'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate, fetchQuestions]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setFeedback('Correct!');
      setScore(prevScore => prevScore + 1);
    } else {
      setFeedback(`Wrong! The correct answer is ${currentQuestion.correct_answer}`);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedback('');
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setGameCompleted(true);
        saveScore();
      }
    }, 2000);
  };

  const saveScore = async () => {
    if (!isAuthenticated || !user) {
      console.error('User not authenticated');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_scores')
        .upsert({ 
          user_id: user.id, 
          guess_game_score: score 
        }, { 
          onConflict: 'user_id',
          update: ['guess_game_score', 'updated_at']
        });

      if (error) throw error;
      console.log('Score saved successfully');
    } catch (error) {
      console.error('Error saving score:', error);
      alert('Error saving score: ' + error.message);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameCompleted(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="login-prompt">
        <h2>Please log in to play the Guess Game</h2>
        <button onClick={() => navigate('/')}>Go to Login</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (gameCompleted) {
    return (
      <div className="guess-game-container results-screen">
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score} out of {questions.length}</p>
        <button className="restart-button" onClick={restartGame}>Play Again</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="guess-game-container">
      <div className="image-grid">
        {currentQuestion.image_urls?.map((url, index) => (
          <div key={index} className="image-item">
            <img src={url} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="question-container">
        <p className="question">{currentQuestion.question}</p>
      </div>
      <div className="answers-container">
        {['a', 'b', 'c', 'd'].map((letter) => (
          <button
            key={letter}
            className={`answer-button ${selectedAnswer === currentQuestion[`option_${letter}`] ? 'selected' : ''}`}
            onClick={() => handleAnswerSelect(currentQuestion[`option_${letter}`])}
          >
            <span className="answer-letter">{letter.toUpperCase()}</span>
            <span className="answer-text">{currentQuestion[`option_${letter}`]}</span>
          </button>
        ))}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      <div className="progress">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
    </div>
  );
};

export default GuessGame;
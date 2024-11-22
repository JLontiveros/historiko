import React, { useState, useEffect, useCallback } from 'react';
import './GuessGame2.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { supabase } from '../../supabaseClient';
import Dashboard from '../Minigames/Dashboard'; // Import the new Dashboard component

const GuessGame2 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [userScores, setUserScores] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const fetchQuestions = useCallback(async () => {
    const { data, error } = await supabase
      .from('guess_game_question2')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching questions:', error);
    } else {
      setQuestions(data);
    }
  }, []);

  const fetchUserScores = async () => {
    const { data, error } = await supabase
      .from('user_scores')
      .select(`
        user_id,
        guess_game_score2,
        updated_at,
        users (username)
      `)
      .order('guess_game_score2', { ascending: false });

    if (error) {
      console.error('Error fetching user scores:', error);
    } else {
      setUserScores(data);
    }
  };

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
    
    let updatedScore = score; // Initialize a variable to track the updated score
  
    if (answer === currentQuestion.correct_answer) {
      setFeedback('Tama!');
      updatedScore = score + 1; // Calculate the new score
      setScore(updatedScore);   // Update the state
    } else {
      setFeedback(`Mali! Ang tamang sagot ay ${currentQuestion.correct_answer}`);
    }
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedback('');
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setGameCompleted(true);
        saveScore(updatedScore);  // Pass the updated score directly to saveScore
      }
    }, 2000);
  };  

  const saveScore = async (finalScore) => {
    if (!isAuthenticated || !user) {
      console.error('User not authenticated');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('user_scores')
        .upsert(
          {
            user_id: user.id,
            guess_game_score2: finalScore,
            updated_at: new Date().toISOString() // Ensure `updated_at` is explicitly updated
          },
          {
            onConflict: 'user_id'
          }
        );
  
      if (error) throw error;
      console.log('Score saved successfully', data);
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

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  if (!isAuthenticated) {
    return (
      <div className="login-prompt">
        <h2>Please log in to play the Guess Game</h2>
        <button onClick={() => navigate('/')}>Go to Login</button>
      </div>
    );
  }

  if (showDashboard) {
    return <Dashboard />;
  }

  if (!questions.length || currentQuestionIndex >= questions.length) {
    return <div>Loading...</div>;
  }

  if (gameCompleted) {
    return (
      <div className="guess-game-container results-screen">
        <h2>Pagbati saiyo</h2>
        <p>Ang iyong puntos: {score} / {questions.length}</p>
        <button className="restart-button" onClick={restartGame}>Ulitin ang pag susulit</button>
        {/* <button className="dashboard-button" onClick={toggleDashboard}>Tignan ang puntos</button> */}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="guess-game-container">
      <div className="image-grid">
        {currentQuestion && currentQuestion.image_urls && (
          Array.isArray(currentQuestion.image_urls)
            ? currentQuestion.image_urls.map((url, index) => (
                <div key={index} className="image-item">
                  <img src={url.trim()} alt={`Question ${index + 1}`} />
                </div>
              ))
            : typeof currentQuestion.image_urls === 'string'
              ? currentQuestion.image_urls.split(',').map((url, index) => (
                  <div key={index} className="image-item">
                    <img src={url.trim()} alt={`Question ${index + 1}`} />
                  </div>
                ))
              : <div className="image-item">
                  <img src={currentQuestion.image_urls} alt="Question" />
                </div>
        )}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      <div className="question-container">
        <p className="question">{currentQuestion.question}</p>
      </div>
      <div className="answers-container">
        {['a', 'b', 'c', 'd'].map((letter) => (
          <button
            key={letter}
            className={`answer-button ${
              selectedAnswer === currentQuestion[`option_${letter}`]
                ? selectedAnswer === currentQuestion.correct_answer
                  ? 'selected'
                  : 'wrong'
                : ''
            }`}
            onClick={() => handleAnswerSelect(currentQuestion[`option_${letter}`])}
          >
            <span className="answer-letter">{letter.toUpperCase()}</span>
            <span className="answer-text">{currentQuestion[`option_${letter}`]}</span>
          </button>
        ))}
      </div>
      <div className="progress">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
    </div>
  );
};

export default GuessGame2;
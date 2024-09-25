import React, { useState, useEffect, useCallback } from 'react';
import './GuessGame.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { supabase } from '../../supabaseClient';
import gamebg from '../../assets/historikobg.png'

const GuessGame = () => {
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
      .from('guess_game_questions')
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
        guess_game_score,
        updated_at,
        users (username)
      `)
      .order('guess_game_score', { ascending: false });

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
    if (answer === currentQuestion.correct_answer) {
      setFeedback('Tama!');
      setScore(prevScore => prevScore + 1);
    } else {
      setFeedback(`Mali! Ang tamang sagot ay ${currentQuestion.correct_answer}`);
    }
    
    // Set a timeout to remove the 'wrong' class after the feedback duration
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

  const toggleDashboard = () => {
    if (!showDashboard) {
      fetchUserScores();
    }
    setShowDashboard(!showDashboard);
  };

  const Dashboard = () => (
    <div className="dashboard">
      <h2>User Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Date Taken</th>
          </tr>
        </thead>
        <tbody>
          {userScores.map((userScore, index) => (
            <tr key={index}>
              <td>{userScore.users.username}</td>
              <td>{userScore.guess_game_score}</td>
              <td>{new Date(userScore.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={toggleDashboard}>Close Dashboard</button>
    </div>
  );

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
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score} out of {questions.length}</p>
        <button className="restart-button" onClick={restartGame}>Play Again</button>
        <button className="dashboard-button" onClick={toggleDashboard}>View Dashboard</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="guess-game-container">
      <div className="image-grid">
        {currentQuestion.image_urls && (
          <div className="image-item">
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

export default GuessGame;
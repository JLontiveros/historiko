import React, { useState, useEffect, useCallback } from 'react';
import ChatBox from '../Chat/ChatBot';
import './GuessGame.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { supabase } from '../../supabaseClient';
import Dashboard from '../Minigames/Dashboard'; // Import the new Dashboard component

const GuessGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [userScores, setUserScores] = useState([]);
  const [timer, setTimer] = useState(30);  // State for countdown timer
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);

  localStorage.removeItem('gamechosen');

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

  // Start the timer whenever a new question is displayed
  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            handleNextQuestion(); // Go to the next question after timer ends
            return 30; // Reset timer for next question
          }
          return prevTimer - 1;
        });
      }, 1000);
      
      // Clear interval on component unmount or when the question changes
      return () => clearInterval(countdown);
    }
  }, [currentQuestionIndex, questions]);

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
      setWrongAnswerCount((prevCount) => prevCount + 1);
    }

    
    /* Check for 3 wrong answers */
    if (wrongAnswerCount + 1 >= 3) {
      Swal.fire({
        title: 'You failed the Quiz!',
        text: "Try harder next time. You did well",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, proceed'
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to the "kasunduan" link if confirmed
          window.location.href = window.location.href;
        }
      });
    
      // Set a timeout to redirect after 2 seconds if no action is taken
      setTimeout(() => {
        window.location.href = window.location.href;  // Redirect after 2 seconds
      }, 2000); // 2000 ms = 2 seconds
    
      return; // Stop further processing
    }
    
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedback('');
      handleNextQuestion(updatedScore);
    }, 2000);
  };  

  const handleNextQuestion = (updatedScore = score) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimer(30);  // Reset timer for next question
    } else {
      setGameCompleted(true);
      saveScore(updatedScore);  // Pass the updated score directly to saveScore
    }
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
            guess_game_score: finalScore,
            teacher_id: localStorage.getItem("id"),
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
    setTimer(30);  // Reset timer on restart
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
    return <Dashboard onClose={toggleDashboard} />;
  }

  if (!questions.length || currentQuestionIndex >= questions.length) {
    return <div>Loading...</div>;
  }


  if (gameCompleted) {
    Swal.fire({
      title: 'Matagumpay na nakatapos!',
      text: `Ang iyong puntos: ${score} / ${questions.length}`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Subukang muli!',
      cancelButtonText: 'Lumabas',
    }).then((result) => {
      if (result.isConfirmed) {
        restartGame(); // Restart the game if the user chooses to try again
      } else {
        window.location.href = window.location.href; // Navigate away if the user chooses to exit
      }
    });
  
    return null; // Render nothing while SweetAlert is active
  }
  

  const currentQuestion = questions[currentQuestionIndex];

  
  return (
    <div className="guess-game-container">
      <div className="timer">
        <p>Time Remaining: {timer} seconds</p>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>
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
                  <img src={currentQuestion.image_urls} className='images-questions' alt="Question" />
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
        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
      </div>
      <div className="progress-container">
  <div 
    className="progress-bar" 
    style={{
      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
    }}
  />
</div>

    <ChatBox /> 
</div>
  );       


};

export default GuessGame;

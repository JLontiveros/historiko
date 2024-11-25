import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ onClose }) => {
  const [userScores, setUserScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generalPassingPercentage, setGeneralPassingPercentage] = useState(0); // General passing percentage state
  const navigate = useNavigate();

  const fetchUserScores = async () => {
    try {
      const { data, error } = await supabase
        .from('user_scores')
        .select(`
          user_id,
          guess_game_score,
          guess_game_score2,
          updated_at,
          users (name)
        `);
  
      if (error) {
        console.error('Error fetching user scores:', error);
      } else {
        const maxQuizScore = 20; // Max score for each quiz
        const maxTotalScore = maxQuizScore * 2; // Max total score across both quizzes
  
        // Calculate total score, percentage, and sort by percentage descending
        const scoresWithPercentage = data
          .map((userScore) => {
            const quiz1Score = userScore.guess_game_score || 0;
            const quiz2Score = userScore.guess_game_score2 || 0;
            const totalScore = quiz1Score + quiz2Score;
            const percentage = (totalScore / maxTotalScore) * 100; // Percentage for the student
            return { ...userScore, totalScore, percentage };
          })
          .sort((a, b) => b.percentage - a.percentage); // Sort by percentage descending
  
        // Calculate the general passing percentage
        const totalCorrectAnswers = scoresWithPercentage.reduce(
          (sum, user) => sum + user.totalScore,
          0
        );
        const totalPossibleItems =
          scoresWithPercentage.length * maxTotalScore; // Total possible items for all students
        const passingPercentage =
          (totalCorrectAnswers / totalPossibleItems) * 100;
  
        setUserScores(scoresWithPercentage);
        setGeneralPassingPercentage(passingPercentage.toFixed(2)); // Round to 2 decimals
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setIsLoading(false);
    }
  };    

  useEffect(() => {
    fetchUserScores();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading scores...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Mga puntos</h2>
      <table>
        <thead>
          <tr className="contents">
            <th>Name</th>
            <th>Pagsusulit 1 (20 pts)</th>
            <th>Pagsusulit 2 (20 pts)</th>
            <th>Kabuuang puntos (40 pts)</th>
            <th>Porsyento</th>
            <th>Petsa ng pagkuha</th>
          </tr>
        </thead>
        <tbody>
          {userScores.map((userScore, index) => (
            <tr key={index}>
              <td>{userScore.users?.name || 'Unknown'}</td>
              <td>{userScore.guess_game_score}</td>
              <td>{userScore.guess_game_score2}</td>
              <td>{userScore.totalScore}</td>
              <td>{userScore.percentage.toFixed(2)}%</td> {/* Display percentage */}
              <td>{new Date(userScore.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summary">
        <h3>Pangkalahatang Porsyentong Pagpasa: {generalPassingPercentage}%</h3>
      </div>
      <button onClick={goBack}>Bumalik</button>
    </div>
  );
};

export default Dashboard;

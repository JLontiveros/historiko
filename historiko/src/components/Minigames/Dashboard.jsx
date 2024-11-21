import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = ({ onClose }) => {
  const [userScores, setUserScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchUserScores = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserScores();
  }, []);

  // Function for navigating back
  const goBack = () => {
    navigate(-1); // Navigates to the previous page in history
  };

  if (isLoading) {
    return <div>Loading scores...</div>;
  }

  return (
    <div className="dashboard">
      <h2>User Scores</h2>
      <table>
        <thead>
          <tr className='contents'>
            <th>Username</th>
            <th>Score</th>
            <th>Date Taken</th>
          </tr>
        </thead>
        <tbody>
          {userScores.map((userScore, index) => (
            <tr key={index}>
              <td>{userScore.users?.username || 'Unknown'}</td>
              <td>{userScore.guess_game_score}</td>
              <td>{new Date(userScore.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={goBack}>Bumalik</button> {/* Button triggers goBack */}
    </div>
  );
};

export default Dashboard;

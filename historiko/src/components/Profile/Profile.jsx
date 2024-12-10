import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { supabase } from '../../supabaseClient';
import './Profile.css';
import girlicon from '../../assets/girlicon.png';
import pen2 from '../../assets/pen2.png';
import uploadarea from '../../assets/uploadareacropped.png';
import uploadicon from '../../assets/uploadicon.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [rewards, setRewards] = useState([]);
  const [topics, setTopics] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (isAuthenticated && user) {
        await fetchUserProfile();
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (userId) {
        await Promise.all([
          fetchUserRewards(),
          fetchTopics(),
          fetchUserProgress()
        ]);
        setIsLoading(false);
      }
    };

    fetchAdditionalData();
  }, [userId]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, bio, avatar_url')
        .eq('username', user.username)
        .single();

      if (error) throw error;

      setUserId(data.id);
      setName(data.name || user.username);
      setBio(data.bio || 'Ako ay estudyante');
      setAvatarUrl(data.avatar_url || '');
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserRewards = async () => {
    const { data, error } = await supabase
      .from('user_reward')
      .select(`
        id,
        created_at,
        rewards:reward_id (
          id,
          reward,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
  
    if (error) {
      console.error('Error fetching user rewards:', error);
    } else {
      console.log('Fetched user rewards:', data);
      
      // Group rewards by their type and keep only the earliest instance
      const uniqueRewards = data.reduce((acc, current) => {
        const x = acc.find(item => item.rewards.id === current.rewards.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setRewards(uniqueRewards || []);
    }
  };

  const fetchTopics = async () => {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching topics:', error);
    } else {
      setTopics(data || []);
    }
  };

  const fetchUserProgress = async () => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('topic_id, progress')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user progress:', error);
    } else {
      const progressObj = {};
      data.forEach(item => {
        progressObj[item.topic_id] = item.progress;
      });
      setUserProgress(progressObj);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const CircularProgressBar = ({ score, total }) => {
    const numericScore = Number(score) || 0;
    const numericTotal = Number(total) || 100; // Default to 100 if not provided
  
    const percentage = (numericScore / numericTotal) * 100;
    const strokeWidth = 2;
    const radius = 20;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <svg height={radius * 2} width={radius * 2} className="circular-progress">
        <circle
          stroke="#E0E0E0"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#4CAF50"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: isNaN(strokeDashoffset) ? 0 : strokeDashoffset  }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        <circle
          fill="#8c85d5"
          r={radius - strokeWidth}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fill="black"
          fontSize="9px"
          fontWeight="bold"
        >
          {score}{total}
        </text>
      </svg>
    );
  };

  const calculateTotalProgress = () => {
    return Object.values(userProgress).reduce((sum, current) => sum + current, 0);
  };

  const handleEditClick = () => {
    setFormVisible(!isFormVisible);
  };

  const handleLogout = () => {
    localStorage.setItem('hasLoggedIn', 'false');
    localStorage.setItem('hasShownToast', 'false');

    localStorage.setItem('hasShownUnatalakyinToast', 'false');
    localStorage.setItem('hasShownDalwatalakyinToast', 'false');
    //MODULES
    localStorage.setItem('hasShownUnangputokToast', 'false');
    localStorage.setItem('hasShownTiradpassToast', 'false');
    localStorage.setItem('hasShownBalangigaToast', 'false');
    localStorage.setItem('hasShownSigawToast', 'false');
    localStorage.setItem('hasShownTejerosToast', 'false');
    localStorage.setItem('hasShownBatoToast', 'false');
    // SUBMODULES
    localStorage.setItem('hasViewedputok3D', 'false');
    localStorage.setItem('hasViewedtirad3D', 'false');
    localStorage.setItem('hasViewedbalangiga3D', 'false');
    localStorage.setItem('hasViewedpugadlawin3D', 'false');
    localStorage.setItem('hasViewedconvention3D', 'false');
    localStorage.setItem('hasViewedkasunduan3D', 'false');
    // 3D
    localStorage.setItem('putok3dToastShown', 'false');
    localStorage.setItem('tirad3dToastShown', 'false');
    localStorage.setItem('balangiga3dToastShown', 'false');
    localStorage.setItem('pugad3dToastShown', 'false');
    localStorage.setItem('convention3dToastShown', 'false');
    localStorage.setItem('kasunduan3dToastShown', 'false');

    logout();
    navigate('/');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !isFormVisible) return;
  
    try {
      let avatarUrlToSave = avatarUrl;
      
      const avatarFile = document.getElementById('avatar').files[0];
      if (avatarFile && user) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`public/${user.username}/${avatarFile.name}`, avatarFile, {
            cacheControl: '3600',
            upsert: true
          });
  
        if (uploadError) throw uploadError;
  
        avatarUrlToSave = supabase.storage
          .from('avatars')
          .getPublicUrl(uploadData.path).data.publicUrl;
  
        setAvatarUrl(avatarUrlToSave);
      }
  
      const { error: userError } = await supabase
        .from('users')
        .update({ name, bio, avatar_url: avatarUrlToSave })
        .eq('id', userId);
  
      if (userError) throw userError;
  
      if (newPassword) {
        const { error: passwordError } = await supabase
          .from('users')
          .update({ password: newPassword })
          .eq('id', userId);
        if (passwordError) throw passwordError;
      }
  
      alert('Matagumpay na nakapagpalit!');
      setFormVisible(false);
      fetchUserProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile: ' + error.message);
    }
  };
  
  const handleAvatarUpload = async (event) => {
    if (!isFormVisible) return;
    const file = event.target.files[0];
    if (!file || !user) return;
    try {
      setAvatarUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error handling avatar upload:', error);
      alert('Error handling avatar upload: ' + error.message);
    }
  };

  return (
    <>
    <ToastContainer />
      <div className="profile">
        <div className="profile-container">
          <div className="user">
            <img src={avatarUrl || girlicon} alt='profile' />
            <div className="user-info">
              <span>{name}</span>
              <span>{bio}</span>
            </div>
          </div>
          <div className="btnright">
            <button onClick={handleLogout}>Log Out</button>
            <button onClick={handleEditClick}>Edit<img src={pen2} alt='pen'/></button>
          </div>
        </div>

        <div className="second-container">
          <div className="gantimpala-container">
            <h1>Mga Gantimpala</h1>
            <div className="gantimpala-content">
              {rewards.length > 0 ? (
                rewards.map((userReward, index) => (
                  <div key={userReward.id} className={`gantimpalas ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}>
                    <img 
                      src={userReward.rewards?.image_url || 'path/to/default/badge.png'} 
                      className='badge' 
                      alt={userReward.rewards?.reward || 'Badge'}
                    />
                    <div className="info">
                      <span>{userReward.rewards?.reward || 'Unnamed Reward'}</span>
                      <span>Date: {new Date(userReward.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-rewards">No rewards found</div>
              )}
            </div>
          </div>
          <div className="resulta-container">
          <h1>Resulta</h1>
          {topics.map((topic) => (
            <div key={topic.id} className="topic-item">
              <CircularProgressBar score={userProgress[topic.id] || 0} total={'%'} />
              <span>{topic.topic_name}</span>
            </div>
          ))}
          {/* <div className="topic-item">
            <CircularProgressBar score={calculateTotalProgress()} total={100} />
            <span>Total Progress</span>
          </div> */}
        </div>
        </div>

        {isFormVisible && (
          <div className="edit-form visible">
            <form onSubmit={handleSave}>
              <div className="edit-profile">
                <label htmlFor='profile'>Profile:</label>
              <div className="upload-pic flex-col">
              <label for="avatar">
                <img src={avatarUrl || uploadarea} alt='Upload avatar' />
                <div class="upload-overlay">
                  <span class="upload-icon"><img src={uploadicon} alt="Upload icon"/></span>
                </div>
                <input
                  type="file"
                  id="avatar"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={handleAvatarUpload}
                  style={{ display: 'none' }}
                />
              </label>
              </div>
              </div>
              {/* <div className='user-tag'>
                <h1>{name}</h1>
              </div> */}
              <div className='edit-user'>
                <label htmlFor="name">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='edit-pass'>
                <label htmlFor="pass">Change Password:</label>
                <input 
                  type="password" 
                  id="pass" 
                  name="pass"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className='edit-bio'>
                <label htmlFor="bio">Bio:</label>
                <input 
                  type="text" 
                  id="bio" 
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
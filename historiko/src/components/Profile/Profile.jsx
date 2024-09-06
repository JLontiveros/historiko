import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { supabase } from '../../supabaseClient';
import './Profile.css';
import girlicon from '../../assets/girlicon.png';
import pen2 from '../../assets/pen2.png';
import uploadarea from '../../assets/uploadareacropped.png';

const Profile = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [id, setId] = useState('')
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (id) {
      fetchUserRewards();
    }
  }, [id]);

  const fetchUserProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('users')
      .select('name, bio, avatar_url, id')
      .eq('username', user.username)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
    } else if (data) {
      setName(data.name || user.username);
      setBio(data.bio || 'Ako ay estudyante');
      setAvatarUrl(data.avatar_url || '');
      setId(data.id || '');
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
      .eq('user_id', id);
  
    if (error) {
      console.error('Error fetching user rewards:', error);
    } else {
      console.log('Fetched user rewards:', data);
      setRewards(data || []);
    }
  };

  const handleEditClick = () => {
    setFormVisible(!isFormVisible);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
  
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
        .eq('username', user.username);
  
      if (userError) throw userError;
  
      if (newPassword) {
        const { error: passwordError } = await supabase
          .from('users')
          .update({ password: newPassword })
          .eq('username', user.username);
        if (passwordError) throw passwordError;
      }
  
      alert('Profile updated successfully!');
      setFormVisible(false);
      fetchUserProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile: ' + error.message);
    }
  };
  
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !user) return;
    try {
      setAvatarUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error handling avatar upload:', error);
      alert('Error handling avatar upload: ' + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-prompt">
        <h2>Please log in to view your profile</h2>
        <button onClick={() => navigate('/')}>Go to Login</button>
      </div>
    );
  }

  return (
    <>
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
            <div className="first">
              <span>Sigaw ng Pugad-Lawin</span>
            </div>
            <div className="second">
              <span>Tejeros Convention</span>
            </div>
            <div className="third">
              <span>Balangiga Massacre</span>
            </div>
            <div className="fourth">
              <span>Kasunduan sa Biak-na-Bato</span>
            </div>
            <div className="fifth">
              <span>Unang Putok sa panukulan ng Silencio at Sociego, Sta Mesa</span>
            </div>
          </div>
        </div>

        <div className={`edit-form ${isFormVisible ? 'visible' : ''}`}>
          <form onSubmit={handleSave}>
            <div className="upload-pic flex-col">
              <label htmlFor="avatar">
                <img src={avatarUrl || uploadarea} alt='Upload avatar' />
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className='user-tag'>
              <h1>{name}</h1>
            </div>
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
      </div>
    </>
  );
}

export default Profile;
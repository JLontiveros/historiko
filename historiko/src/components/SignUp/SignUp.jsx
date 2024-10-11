import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../App';
import './SignUp.css';

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const { login, logout } = useAuth();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setSignUpSuccess(false);
  };

  const generateToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingUser) {
        alert('Username already exists');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .insert([{ username, password, name }]);

      if (error) throw error;

      // Clear the form
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setName('');

      // Set sign-up success state
      setSignUpSuccess(true);

      // Switch to sign-in form
      setIsSignUp(false);

    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, name')
        .eq('username', username)
        .eq('password', password)
        .single();
  
      if (error) throw error;
  
      if (data) {
        console.log(data.id);
        const newToken = generateToken();
        localStorage.setItem('id', data.id);
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('user', JSON.stringify({
          id: data.id,
          username: data.username,
          name: data.name,
          token: newToken
        }));
        setToken(newToken);
        alert('Sign in successful!');
        login({ 
          id: data.id, 
          username: data.username, 
          name: data.name, 
          token: newToken 
        });
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    setToken(null);
    logout();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setToken(userData.token);
    }
  }, []);

  if (token) {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <h1>Welcome, {storedUser.name || storedUser.username}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1 className="title">Gumawa ng Account</h1>
            <input
              type="text"
              placeholder="Name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="btn" type="submit">Mag-sign up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1 className="title">Mag-sign in</h1>
            {signUpSuccess && (
              <p className="success-message">Account created successfully! Please sign in.</p>
            )}
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" type="submit">Mag patuloy</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Maligayang pagbabalik!</h1>
              <p>Para manatili kang konektado, mangyaring mag-login gamit ang iyong personal na impormasyon.</p>
              <button className="btn transparent" onClick={toggleForm}>SIGN IN</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Halina't Matuto!</h1>
              <p>Ipasok ang iyong mga personal na detalye at simulan ang paglalakbay.</p>
              <button className="btn transparent" onClick={toggleForm}>SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
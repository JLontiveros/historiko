import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import './Signup.css';

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      // Check if username already exists
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

      // Insert new user into the users table
      const { data, error } = await supabase
        .from('users')
        .insert([{ username, password }]);

      if (error) throw error;

      alert('Sign up successful!');
      // You might want to automatically sign in the user here
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) throw error;

      if (data) {
        alert('Sign in successful!');
        // Here you would typically set user session or redirect
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1 className="title">Create Account</h1>
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
            <button className="btn" type="submit">SIGN UP</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1 className="title">Sign in</h1>
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
            <p className="forgot-password">Forgot password</p>
            <button className="btn" type="submit">SIGN IN</button>
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
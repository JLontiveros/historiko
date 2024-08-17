// components/SignUp/Signup.jsx
import React, { useState } from 'react';
import './Signup.css';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth-container">
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form action="#">
            <h1 className="title">Create Account</h1>
            <input type="text" placeholder="Username" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            <input type="password" placeholder="Confirm Password" className="input-field" />
            <button className="btn">SIGN UP</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1 className="title">Sign in</h1>
            <input type="text" placeholder="Username" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            <p className="forgot-password">Forgot password</p>
            <button className="btn">SIGN IN</button>
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

export default AuthForm;
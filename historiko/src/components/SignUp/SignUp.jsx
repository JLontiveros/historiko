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
  const [email, setEmail] = useState(''); // New state for forgot password
  const [forgotPassword, setForgotPassword] = useState(false); // Toggle Forgot Password Form
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const { login, logout } = useAuth();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setSignUpSuccess(false);
    // Reset form fields when toggling
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setForgotPassword(false); // Reset forgot password form when toggling
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
      if (!username || !password) {
        alert("Gumawa ng account kung ikaw ay wala pang account");
        return;
      }
  
      const { data, error } = await supabase
        .from('users')
        .select('id, username, name')
        .eq('username', username)
        .eq('password', password)
        .single();
  
      if (error) {
        alert("Mali ang iyong binigay na password");
        return;
      }
  
      if (data) {
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
        alert('Matagumpay na nakapag-Sign in!');
        login({ 
          id: data.id, 
          username: data.username, 
          name: data.name, 
          token: newToken 
        });
      }
    } catch (error) {
      alert("Mali ang iyong binigay na password");
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

  // const handleForgotPassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!email) {
  //       alert('Mangyaring ilagay ang iyong email.');
  //       return;
  //     }

  //     const resetCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
  //     // Save reset code in the database
  //     const { data, error } = await supabase
  //       .from('users')
  //       .update({ reset_code: resetCode })
  //       .eq('email', email);

  //     if (error) {
  //       alert('Walang account na nauugnay sa email na ito.');
  //       return;
  //     }

  //     setCodeSent(true);
  //     alert(`Reset code sent to ${email}.`);
  //   } catch (error) {
  //     alert('Error sending reset code. Subukang muli.');
  //   }
  // };

  const handleGoBack = async (e) => {
    e.preventDefault();
    setForgotPassword(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (!resetCode || !newPassword) {
        alert('Mangyaring punan ang lahat ng patlang.');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .update({ password: newPassword, reset_code: null })
        .eq('reset_code', resetCode);

      if (error || !data.length) {
        alert('Maling reset code.');
        return;
      }

      alert('Password successfully reset. Please sign in.');
      setForgotPassword(false);
    } catch (error) {
      alert('Error resetting password. Subukang muli.');
    }
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
      <div className="logged-in-container">
        <h1>Welcome, {storedUser.name || storedUser.username}!</h1>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <>
      <div className="auth-container">
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1 className="title">Gumawa ng Account</h1>
              <input
                type="text"
                placeholder="Pangalan"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Username"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Kumpirmahin"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button className="btn" type="submit">Mag-sign up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
          <form onSubmit={forgotPassword ? handleResetPassword : handleSignIn}>
              <h1 className="title">{forgotPassword ? 'Nakalimutan ang Password?' : 'Mag-sign in'}</h1>
              {forgotPassword ? (
                <>
                  {!codeSent ? (
                    <>
                      <p>Mangyaring makipag ugnay sa iyong guro hinggil sa pagbabago ng password</p>
                      {/* <button className="btn" type="button" onClick={handleForgotPassword}>
                        Send Reset Code
                      </button> */}
                      <button className="btn" type="button" onClick={handleGoBack}>
                        Bumalik
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Reset Code"
                        className="input-field"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="input-field"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button className="btn" type="submit">Reset Password</button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="forgot-password" onClick={() => setForgotPassword(true)}>
                    Nakalimutan ang password?
                  </p>
                  <button className="btn" type="submit">Mag-sign in</button>
                </>
              )}
            </form>
          </div>
          
          {/* Overlay container for desktop view */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Maligayang pagbabalik!</h1>
                <p>Para manatili kang konektado, mangyaring mag-login gamit ang iyong personal na impormasyon.</p>
                <button className="btn transparent" onClick={toggleForm}>MAG-SIGN IN</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Halina't Matuto!</h1>
                <p>Ipasok ang iyong mga personal na detalye at simulan ang paglalakbay.</p>
                <button className="btn transparent" onClick={toggleForm}>MAG-SIGN UP</button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {windowWidth <= 768 && (
          <div className="mobile-nav">
            <button 
              className="btn mobile-toggle" 
              onClick={toggleForm}
            >
              {isSignUp ? 'Mag-Sign In' : 'Mag-Sign Up'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
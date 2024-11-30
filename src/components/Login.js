import React, { useState } from 'react';
import './Login.css';

const Login = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic here
    console.log("Username:", username);
    console.log("Password:", password);
    onClose(); // Close modal after submission (optional)
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <p>Already have an account? <a href="#">Log in</a></p>
            <button className="login-button" type="submit">Sign Up</button>
          </form>
        </div>
        <div className="welcome-back">
          <h2>CITIZENSHIP VERIFICATION</h2>
          <p>Complete your verification process to access services.</p>
        </div>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};

export default Login;

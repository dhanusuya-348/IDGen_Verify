import React, { useState } from 'react';
import './Signup.css'; // Make sure to have your styles here

const Signup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(false); // State to toggle between Signup and Login forms
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (isLogin) {
      return formData.username && formData.password;
    } else {
      return (
        formData.username &&
        formData.email &&
        formData.password &&
        formData.password === formData.confirmPassword
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill out all fields and ensure passwords match.');
      return;
    }

    const url = isLogin
      ? 'http://localhost:5000/login'
      : 'http://localhost:5000/signup';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ username: formData.username }));
        alert(isLogin ? 'Login successful' : 'Signup successful');
        onClose();
      }
      
       else {
        alert(data.message || 'Error occurred');
      }
    } catch (error) {
      alert('Server error, please try again later.');
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <div className="signup-form">
          <h2>{isLogin ? 'LOGIN' : 'SIGN UP'}</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          )}
          <p>
            {isLogin
              ? "Don't have an account? "
              : 'Already have an account? '}
            <a
              href="#"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up here' : 'Login here'}
            </a>
          </p>
          <button className="signup-button" onClick={handleSubmit}>
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </button>
        </div>
        <div className="welcome-back">
          <h2>WELCOME TO CITIZENSHIP VERIFICATION!</h2>
          <p>
            {isLogin
              ? 'Please login to access your account.'
              : 'Sign up to start your journey of verifying citizenship and identity through our secure platform.'}
          </p>
        </div>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Signup;

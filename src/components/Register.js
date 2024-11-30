// src/components/Register.js

import React, { useState } from 'react';
import './Register.css';
import Webcam from 'react-webcam';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    dob: '',
    phone: '',
    email: '',
    faceScan: null,
    rationCard: null,
  });
  const [isScanning, setIsScanning] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      rationCard: e.target.files[0],
    });
  };

  const handleCapture = (imageSrc) => {
    setFormData({
      ...formData,
      faceScan: imageSrc,
    });
    setIsScanning(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You need to log in to register!');
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post(
        'http://localhost:5000/register',
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 201) {
        const { uniqueID } = response.data; // Get the unique ID from the response
        alert('Registration submitted successfully!');
        
        // Include unique ID in form data to pass to the ID card page
        navigate('/id-card', { state: { ...formData, uniqueID } });
      } else {
        alert('Error submitting registration.');
      }

    } catch (error) {
      console.error('Error during registration submission:', error);
      alert('There was an error submitting your registration. Please try again.');
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="form-title">REGISTER</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Date of Birth (DOB):</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        {/* Face Scan Section */}
        <div className="form-group">
          <label>Face Scan:</label>
          <button type="button" onClick={() => setIsScanning(true)}>
            {formData.faceScan ? 'Retake Face Scan' : 'Scan Face'}
          </button>
          {isScanning && (
            <div className="webcam-container">
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                width={300}
                height={300}
                videoConstraints={{ facingMode: 'user' }}
              >
                {({ getScreenshot }) => (
                  <button
                    type="button"
                    onClick={() => handleCapture(getScreenshot())}
                  >
                    Capture
                  </button>
                )}
              </Webcam>
            </div>
          )}
          {formData.faceScan && <img src={formData.faceScan} alt="Face Scan" className="face-scan-preview" />}
        </div>
        <div className="form-group">
          <label>Ration Card (.pdf):</label>
          <input type="file" name="rationCard" accept=".pdf" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Register;

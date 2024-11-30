import React, { useState } from 'react';
import Webcam from 'react-webcam';
import './Verify.css';

const Verify = () => {
  const [uniqueID, setUniqueID] = useState('');
  const [verifyMethod, setVerifyMethod] = useState('');
  const [faceScan, setFaceScan] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleUniqueIDChange = (e) => setUniqueID(e.target.value.trim().toLowerCase());
  const handleVerifyMethodChange = (method) => setVerifyMethod(method);
  
  const handleCapture = async () => {
    const imageSrc = await Webcam.getScreenshot();
    setFaceScan(imageSrc);
  };

  const handleOtpRequest = async () => {
    if (!/^\d{10}$/.test(phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
  
      if (response.ok) {
        setOtpSent(true);
        alert(`Your OTP is: ${data.otp}`);
      } else {
        setErrorMessage(data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('Error sending OTP.');
    }
  };
  
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await response.json();
      
      if (data.verified) {
        setVerificationMessage(data.message);
        setErrorMessage('');
        alert('Card verified successfully!'); // Pop-up message upon successful verification
      } else {
        setErrorMessage(data.message || 'OTP verification failed.');
        setVerificationMessage('');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('Error verifying OTP.');
    }
  };

  return (
    <div className="verify-container">
      <h2>Verification</h2>
      <form className="verify-form" onSubmit={handleOtpVerification}>
        <div className="form-group">
          <label>Unique ID:</label>
          <input type="text" name="uniqueID" value={uniqueID} onChange={handleUniqueIDChange} />
        </div>

        <div className="form-group">
          <label>Verification Method:</label>
          <select
            name="verifyMethod"
            value={verifyMethod}
            onChange={(e) => handleVerifyMethodChange(e.target.value)}
            required
          >
            <option value="">Select Method</option>
            <option value="otp">OTP</option>
            <option value="faceScan">Face Scan</option>
          </select>
        </div>

        {verifyMethod === 'otp' && (
          <>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handleOtpRequest}>Send OTP</button>
            {otpSent && (
              <div className="form-group">
                <label>Enter OTP:</label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}
          </>
        )}

        {verifyMethod === 'faceScan' && (
          <div>
            <h3>Face Scan</h3>
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              ref={Webcam}
            />
            <button type="button" onClick={handleCapture}>Capture</button>
            {faceScan && <img src={faceScan} alt="Captured Face" />}
          </div>
        )}

        <button type="submit">Verify</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}
      {verificationMessage && <p className="success">{verificationMessage}</p>}
    </div>
  );
};

export default Verify;

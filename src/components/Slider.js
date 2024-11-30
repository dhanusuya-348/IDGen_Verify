// src/components/Slider.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Slider.css'; 
import { useAuth } from '../context/AuthContext'; // Adjust the path

const ImageSlider = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Access auth context

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const handleRegisterClick = () => {
    if (isLoggedIn) {
      navigate('/register');
    } else {
      alert('You need to log in to register!');
    }
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="https://surepass.io/wp-content/uploads/2023/07/Web-Banner-Aadhaar-Verification-imp.png" alt="Slide 1" />
        </div>
        <div>
          <img src="https://authbridge.com/wp-content/uploads/2023/08/Aadhaar-Verification-2.png" alt="Slide 2" />
        </div>
        <div>
          <img src="https://surepass.io/wp-content/uploads/2024/05/Aadhaar-Signature-Verification.png" alt="Slide 3" />
        </div>
      </Slider>
      <div className="slider-button-container">
        <br /><br />
        <button className="btn btn-primary" onClick={handleRegisterClick}>Register Now</button>
      </div>
    </div>
  );
};

export default ImageSlider;

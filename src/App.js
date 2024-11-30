import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ImageSlider from './components/Slider';
import Login from './components/Login'; // Import your Login component
import About from './components/About'; // Import your About component
import Contact from './components/Contact'; // Import your Contact component
import Register from './components/Register'; // Import the Register component
import IDCard from './components/IDCard';
import Verify from './components/Verify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const slidesData = [
  { imageUrl: "https://via.placeholder.com/1200x400?text=Slide+1", altText: "Slide 1" },
  { imageUrl: "https://via.placeholder.com/1200x400?text=Slide+2", altText: "Slide 2" },
  { imageUrl: "https://via.placeholder.com/1200x400?text=Slide+3", altText: "Slide 3" },
];

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show the signup modal when the app starts
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ImageSlider slides={slidesData} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} /> {/* Route for About page */}
          <Route path="/contact" element={<Contact />} /> {/* Route for Contact page */}
          <Route path="/register" element={<Register />} /> {/* Route for Register page */}
          <Route path="/id-card" element={<IDCard />} />
          <Route path="/verify" element={<Verify />} /> 
        </Routes>

        {/* Modal for Signup */}
        {showModal && (
          <Login onClose={closeModal} />
        )}
        
        {/* Modal backdrop to close modal when clicked outside */}
        {showModal && (
          <div className="modal-backdrop fade show" onClick={closeModal}></div>
        )}

      </div>
    </Router>
  );
}

export default App;

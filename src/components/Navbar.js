// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';
import logo from '../assets/IDGEN2.jpg'; // Adjust the path based on your folder structure
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import Signup from './Signup'; // Import the Signup component
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const Navbar = () => {
  // State to handle modal visibility
  const [showModal, setShowModal] = useState(false);

  // Use AuthContext for authentication state
  const { isLoggedIn, logout } = useAuth(); // Adjust based on your context structure

  // Function to toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo} className="logo" alt="Logo" /> {/* Use the imported logo */}
        </Link>

        {/* Toggler Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/about">About</Link> {/* Link to About */}
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/contact">Contact Us</Link> {/* Link to Contact */}
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/verify">Verify</Link> {/* Added Verify option here */}
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/register">Register</Link> {/* Link to Register */}
                </li>
                {/* Display username and a logout option */}
                <li className="nav-item user-info">
                  <span className="nav-link custom-link">Welcome, {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : ''}</span>
                </li>
                <li className="nav-item user-info">
                  <a className="nav-link custom-link" href="#" onClick={logout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                {/* Show message for non-logged-in users */}
                <li className="nav-item">
                  <span className="nav-link custom-link">Login to Register.</span>
                </li>
                {/* Show Sign Up link for non-logged-in users */}
                <li className="nav-item">
                  <a className="nav-link signup-link" href="#" onClick={toggleModal}>Sign Up</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Modal for Signup */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Signup onClose={toggleModal} /> {/* Using the Signup component */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop to close modal when clicked outside */}
      {showModal && (
        <div className="modal-backdrop fade show" onClick={toggleModal}></div>
      )}
    </>
  );
};

export default Navbar;

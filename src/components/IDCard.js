// src/components/IDCard.js

import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './IDCard.css';

const IDCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, gender, dob, email, faceScan, uniqueID } = location.state || {}; // Extract unique ID
  const cardRef = useRef(); // Reference to the card for PDF capture

  if (!location.state) {
    navigate('/');
    return null;
  }

  const handleDownloadPDF = async () => {
    const element = cardRef.current;

    // Convert the card to a canvas image
    const canvas = await html2canvas(element, { scale: 2 }); // Increase scale for better resolution
    const imgData = canvas.toDataURL('image/png');

    // Define a new width for the PDF
    const pdfWidth = 800; // Set the width you desire
    const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth; // Maintain aspect ratio

    // Create a PDF and add the image
    const pdf = new jsPDF({
      orientation: 'landscape', // Change to landscape for wider format
      unit: 'px',
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // Set width and height based on the new dimensions
    pdf.save(`${name}_IDCard.pdf`);
  };

  return (
    <div className="page-container">
      <div className="id-card" ref={cardRef}>
        <h1 className="card-title">IDGen Card</h1>

        <div className="card-content">
          <div className="photo-section">
            {faceScan ? (
              <img src={faceScan} alt="ID" className="photo" />
            ) : (
              <div className="photo-placeholder">No Image</div>
            )}
          </div>

          <div className="details-section">
            <h2 className="person-name">{name}</h2>
            <div className="detail-row">
              <span className="detail-label">Gender:</span>
              <span className="detail-value">{gender}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">DOB:</span>
              <span className="detail-value">{dob}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Unique ID:</span>
              <span className="detail-value">{uniqueID}</span> {/* Display Unique ID */}
            </div>
          </div>
        </div>

        <p className="card-footer">This is an electronically generated document</p>
      </div>

      {/* Download Button */}
      <div className="button-container">
        <button className="download-button" onClick={handleDownloadPDF}>
          Download ID Card as PDF
        </button>
      </div>
    </div>
  );
};

export default IDCard;

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="contact-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="contact-header">
        <motion.h1 variants={itemVariants}>Contact & Support</motion.h1>
        <motion.p variants={itemVariants}>
          We're here to assist you. Reach out to us for any inquiries or support.
        </motion.p>
      </div>

      {/* Contact Cards */}
      <div className="contact-cards">
        <motion.div className="contact-card" variants={itemVariants}>
          <div className="contact-icon">
            <Phone />
          </div>
          <div className="contact-details">
            <p className="contact-label">Toll Free</p>
            <a href="tel:2210" className="contact-link">2210</a>
          </div>
        </motion.div>

        <motion.div className="contact-card" variants={itemVariants}>
          <div className="contact-icon">
            <Mail />
          </div>
          <div className="contact-details">
            <p className="contact-label">Email Support</p>
            <a href="mailto:help@idgen.verify.in" className="contact-link">
              help@idgen.verify.in
            </a>
          </div>
        </motion.div>
      </div>

      {/* Info Box */}
      <motion.div className="info-box" variants={itemVariants}>
        <div className="info-icon">
          <AlertCircle />
        </div>
        <div className="info-text">
          <p>Enrolling for Aadhaar is free of cost. Find an Enrollment Center near you.</p>
        </div>
      </motion.div>

      {/* Additional Information */}
      <motion.div className="additional-info" variants={itemVariants}>
        <div className="info-card">
          <div className="info-icon">
            <Clock />
          </div>
          <div className="info-details">
            <p className="contact-label">Support Hours</p>
            <p className="contact-link">24/7 Available</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;

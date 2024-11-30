import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  return (
    <div className="main-container">
      <div className="about-wrapper">
        <section className="hero-section">
          <div className="hero-content">
            <h1>About IDGEN VERIFY</h1>
            <p className="subtitle">Empowering India's Digital Future</p>
          </div>
          <div className="hero-decoration"></div>
        </section>

        <div className="content-container">
          {/* Vision Section */}
          <section className="vision-section">
            <div className="section-header">
              <span className="section-number">01</span>
              <h2>Our Vision</h2>
            </div>
            <div className="section-content">
              <p>
                To empower Aadhaar number holders of India with a unique identity 
                and a digital platform to authenticate anytime, anywhere.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mission-section">
            <div className="section-header">
              <span className="section-number">02</span>
              <h2>Our Mission</h2>
            </div>
            <div className="mission-grid">
              <div className="mission-card">
                <span className="card-icon">🎯</span>
                <h3>Good Governance</h3>
                <p>Efficient, transparent, and targeted delivery of subsidies, benefits, and services.</p>
              </div>
              <div className="mission-card">
                <span className="card-icon">🔐</span>
                <h3>Digital Identity</h3>
                <p>Develop robust systems for updating and authenticating digital identities.</p>
              </div>
              <div className="mission-card">
                <span className="card-icon">⚡</span>
                <h3>Infrastructure</h3>
                <p>Ensure availability, scalability, and resilience of technology infrastructure.</p>
              </div>
              <div className="mission-card">
                <span className="card-icon">🛡️</span>
                <h3>Security</h3>
                <p>Maintain security and confidentiality of identity information.</p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            <div className="section-header">
              <span className="section-number">03</span>
              <h2>Core Values</h2>
            </div>
            <div className="values-container">
              <div className="value-item">
                <div className="value-marker"></div>
                <p>We believe in facilitating good governance</p>
              </div>
              <div className="value-item">
                <div className="value-marker"></div>
                <p>We value integrity above all</p>
              </div>
              <div className="value-item">
                <div className="value-marker"></div>
                <p>We are committed to inclusive nation-building</p>
              </div>
              <div className="value-item">
                <div className="value-marker"></div>
                <p>We pursue a collaborative approach</p>
              </div>
              <div className="value-item">
                <div className="value-marker"></div>
                <p>We strive for excellence in services</p>
              </div>
              <div className="value-item">
                <div className="value-marker"></div>
                <p>We focus on continuous learning</p>
              </div>
              <div className="value-item">
                <div className="value-marker"></div>
                <p>We are driven by innovation</p>
              </div>
              <div className="value-item">
                <div className="value-marker"></div>
                <p>We believe in transparency</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

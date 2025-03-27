import React from "react";
import { Volume2, MapPin, FileInput, Map } from "lucide-react";
import { Link, useNavigate} from "react-router-dom";
import "./Landing.css"; //created this stylesheet separately
import NoiseNabLogo from "./images/noisenab_logo.jpg";

function Landing() {

  const navigate = useNavigate(); // Hook for navigation
  const goToMap = () => {
    navigate("/htmlpage"); // Redirect to the embedded HTML page with the noise map
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo-container">
          <Volume2 size={40} />
          <h1>Noise Nab</h1>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero-section">
  <div className="hero-content">
    <h1>Help Create Quieter, Healthier Cities</h1>
    <p>
      Noise pollution isn't just noise—it's a silent threat to health and well-being.  
      NoiseNab is a community-driven initiative that empowers people to monitor,  
      report, and visualize noise pollution levels in their surroundings.  
      <br /><br />
      By collecting real-time data and generating noise maps, we help individuals,  
      researchers, and policymakers take informed actions toward quieter, healthier cities.  
      <br /><br />
      <strong>Your participation matters!</strong> Join us in shaping a more peaceful urban future.  
    </p>
          <div className="hero-buttons">
            <Link to="/enter-noise-data" className="primary-button">
              <FileInput size={20} />
              Submit Noise Data
            </Link>
            <Link to="/noise-map" className="secondary-button">
              <Map size={20} />
              Explore Noise Map
            </Link>
            </div>
            {/* New Noise Map Button using useNavigate */}
            <div className="hero-buttons-new">
            <button onClick={goToMap} className="primary-button w-full">
              <Map size={20} />
              View Noise Map
            </button>
            </div>
          
        </div>
        <div className="hero-image">
          {/* You can replace this with an actual image or SVG */}
          <div className="placeholder-image">
            <img 
            src={NoiseNabLogo} 
            alt="Noisenab Logo" 
            className="logo-image"
            />
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About NoiseNab</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              NoiseNab is a citizen science initiative that empowers communities to 
              monitor and address noise pollution in their neighborhoods. Our platform 
              collects real-time noise level data from users like you, creating comprehensive 
              maps that identify noise hotspots and help drive policy change.
            </p>
            <p>
              Excessive noise is more than just an annoyance—it's a public health issue 
              linked to stress, sleep disturbance, hearing damage, and decreased quality of life. 
              By participating in NoiseNab, you're contributing to a healthier acoustic environment.
            </p>
          </div>
          <div className="stats-container">
            <div className="stat-box">
              <h3>10,000+</h3>
              <p>Noise Reports</p>
            </div>
            <div className="stat-box">
              <h3>50+</h3>
              <p>Cities Covered</p>
            </div>
            <div className="stat-box">
              <h3>5,000+</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <h2>How NoiseNab Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Submit Noise Reports</h3>
            <p>Use the app to measure and report noise levels in your area. Add notes about the noise source.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Data Aggregation</h3>
            <p>We collect and validate data from thousands of reports to create accurate noise profiles.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Visualization</h3>
            <p>Generate noise maps that identify hotspots and track changes in noise pollution over time.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Drive Change</h3>
            <p>Use the data to advocate for noise reduction measures in your community.</p>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Volume2 size={32} />
            <h3>Noise Level Tracking</h3>
            <p>Simple interface to report noise levels with reference examples (whisper, traffic, etc.)</p>
          </div>
          <div className="feature-card">
            <MapPin size={32} />
            <h3>Location Mapping</h3>
            <p>Automatic location detection or manual entry for precise data collection</p>
          </div>
          <div className="feature-card">
            <Map size={32} />
            <h3>Noise Maps</h3>
            <p>Generate detailed heatmaps showing noise pollution hotspots in your area</p>
          </div>
          <div className="feature-card">
            <FileInput size={32} />
            <h3>Data Analysis</h3>
            <p>Track trends over time and compare noise levels across different locations</p>
          </div>
        </div>

        <div className="cta-container">
          <h3>Ready to contribute?</h3>
          <div className="cta-buttons">
            <Link to="/enter-noise-data" className="primary-button">
              <FileInput size={20} />
              Enter Noise Data
            </Link>
            <Link to="/noise-map" className="secondary-button">
              <Map size={20} />
              Generate Noise Map
            </Link>
          </div>
        </div>
      </section>

      <footer id="contact" className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Volume2 size={24} />
            <h3>NoiseNab</h3>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>Platform</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#features">Hostspot</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Research</a></li>
                <li><a href="#">History</a></li>
                <li><a href="#">FAQs</a></li>

              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Mail us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} NoiseNab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
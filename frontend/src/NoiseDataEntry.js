import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Volume2, MapPin, Check, XCircle, Info, AlertTriangle } from "lucide-react";
import "./NoiseDataEntry.css";

// Noise level reference data
const noiseLevelReference = [
  { level: 10, description: "Breathing, Rustling Leaves", color: "#e0f7fa" },
  { level: 20, description: "Whisper, Quiet Library", color: "#b2ebf2" },
  { level: 30, description: "Soft Conversation", color: "#80deea" },
  { level: 40, description: "Quiet Office", color: "#4dd0e1" },
  { level: 50, description: "Moderate Rainfall", color: "#26c6da" },
  { level: 60, description: "Normal Conversation", color: "#00bcd4" },
  { level: 70, description: "Vacuum Cleaner, Busy Traffic", color: "#00acc1" },
  { level: 80, description: "Alarm Clock, Factory Machinery", color: "#0097a7" },
  { level: 90, description: "Motorcycle, Lawnmower", color: "#00838f" },
  { level: 100, description: "Jackhammer, Loud Concert", color: "#006064" }
];

// Noise Source Options
const noiseSourceOptions = [
  { code: 'Industrial', label: 'Industrial' },
  { code: 'Commercial', label: 'Commercial' },
  { code: 'Residential', label: 'Residential' },
  { code: 'Silence', label: 'Silence' }
];

// Component to update the map center when coordinates change
function SetViewOnChange({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

function App() {
  const [noiseLevel, setNoiseLevel] = useState(50);
  const [manualCity, setManualCity] = useState("");
  const [manualPlace, setManualPlace] = useState("");
  const [manualLocation, setManualLocation] = useState(""); // Added missing state
  const [isManual, setIsManual] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [userLocation, setUserLocation] = useState({ lat: 51.505, lng: -0.09 }); // Default to London
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null
  const [statusMessage, setStatusMessage] = useState("");
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noiseSource, setNoiseSource] = useState(''); // New state for noise source
  const [mapReady, setMapReady] = useState(false);

  // Get current noise description and color
  const getCurrentNoiseInfo = () => {
    const nearest = noiseLevelReference.reduce((prev, curr) => {
      return Math.abs(curr.level - noiseLevel) < Math.abs(prev.level - noiseLevel) ? curr : prev;
    });
    return nearest;
  };

  const noiseInfo = getCurrentNoiseInfo();

  useEffect(() => {
    const updateDateTime = () => {
      const currentDate = new Date();
      setCurrentDateTime(currentDate.toLocaleString());
    };
    
    updateDateTime();
    // Update time every minute
    const interval = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMapReady(true);
        },
        (error) => {
          console.error("Error getting location", error);
          setSubmissionStatus("error");
          setStatusMessage("Could not get your location. Please enter it manually.");
          setIsManual(true);
          setMapReady(true);
        }
      );
    } else {
      setSubmissionStatus("error");
      setStatusMessage("Geolocation is not supported by this browser.");
      setIsManual(true);
      setMapReady(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isManual) {
      if (!manualCity.trim()) {
        setSubmissionStatus("error");
        setStatusMessage("Please enter the city.");
        return;
      }
      
      if (!manualPlace.trim()) {
        setSubmissionStatus("error");
        setStatusMessage("Please enter the specific place within the city.");
        return;
      }
    }
    
    // Check if noise source is selected
    if (!noiseSource) {
      setSubmissionStatus("error");
      setStatusMessage("Please select a Noise Source.");
      return;
    }
    
    const finalLocation = isManual 
      ? { 
          city: manualCity.trim(), 
          place: manualPlace.trim(),
          lat: userLocation.lat, 
          lng: userLocation.lng 
        }
      : { 
          lat: userLocation.lat, 
          lng: userLocation.lng 
        };

        const data = {
          city: manualCity.trim() || "Unknown",
          place: manualPlace.trim() || "Unknown",
          noise_level: noiseLevel,
          category: noiseSource, // Industrial, Commercial, etc.
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          date_time: new Date().toISOString()
        };
        

    
  try {
    const response = await axios.post("http://localhost:5000/api/noise/report", data);
    console.log("Response from backend:", response.data);
    setSubmissionStatus("success");
    setStatusMessage("Thank you for your contribution!");
  } catch (error) {
    console.error("Error submitting data:", error);
    setSubmissionStatus("error");
    setStatusMessage("Submission failed.");
  }
  };
    
  return (
    <div className="app-container">
      <header className="app-header" style={{ backgroundColor: noiseInfo.color }}>
        <div className="logo-container">
          <Volume2 size={40} />
          <h1>Noise Nab</h1>
        </div>
        <p className="tagline">Help create quieter, healthier cities</p>
      </header>

      <main className="main-content">
        <section className="map-section">
          <h2>Current Location</h2>
          <div className="map-container">
            {mapReady && (
              <MapContainer 
                center={[userLocation.lat, userLocation.lng]} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SetViewOnChange coords={[userLocation.lat, userLocation.lng]} />
                <Marker position={[userLocation.lat, userLocation.lng]}>
                  {popupInfo && (
                    <Popup>
                      <div className="map-popup">
                        <h3>Noise Report</h3>
                        <p><strong>{popupInfo.noise_level} dB</strong> - {popupInfo.description}</p>
                        <p className="popup-datetime">{popupInfo.date_time}</p>
                        {popupInfo.noise_source && <p className="popup-notes">Source: {popupInfo.noise_source}</p>}
                      </div>
                    </Popup>
                  )}
                </Marker>
              </MapContainer>
            )}
          </div>
        </section>

        <section className="form-section">
          <h2>Report Noise Level</h2>
          
          <form onSubmit={handleSubmit} className="noise-form">
            <div className="noise-slider-container">
              <div className="noise-value" style={{ color: noiseInfo.color }}>
                <span className="noise-number">{noiseLevel}</span>
                <span className="noise-unit">dB</span>
              </div>
              
              <div className="slider-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(e.target.value)}
                  className="noise-slider"
                  style={{ 
                    background: `linear-gradient(to right, ${noiseInfo.color} 0%, ${noiseInfo.color} ${noiseLevel}%, #e0e0e0 ${noiseLevel}%, #e0e0e0 100%)` 
                  }}
                />
                <div className="noise-description">
                  <p>{noiseInfo.description}</p>
                  <button 
                    type="button" 
                    className="info-button"
                    onClick={() => setShowInfoPopup(!showInfoPopup)}
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="location-container">
              <div className="location-header">
                <h3>Location</h3>
                <label className="manual-toggle">
                  <input
                    type="checkbox"
                    checked={isManual}
                    onChange={() => setIsManual(!isManual)}
                  />
                  <span>Enter manually</span>
                </label>
              </div>
              
              {!isManual ? (
                userLocation.lat && userLocation.lng ? (
                  <div className="current-location">
                    <MapPin size={16} />
                    <span>{userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}</span>
                  </div>
                ) : (
                  <div className="location-loading">
                    <AlertTriangle size={16} />
                    <span>Waiting for location...</span>
                  </div>
                )
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="City"
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    className="manual-location-input"
                  />
                  <input
                    type="text"
                    placeholder="Specific Place"
                    value={manualPlace}
                    onChange={(e) => setManualPlace(e.target.value)}
                    className="manual-location-input"
                  />
                </>
              )}
            </div>

            <div className="noise-source-container">
              <h3>Noise Source </h3>
              <div className="noise-source-options">
                {noiseSourceOptions.map((option) => (
                  <label key={option.code} className="noise-source-option">
                    <input
                      type="radio"
                      name="noiseSource"
                      value={option.code}
                      checked={noiseSource === option.code}
                      onChange={() => setNoiseSource(option.code)}
                      required
                    />
                    <span>{option.label} ({option.code})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="timestamp-container">
              <h3>Date and Time</h3>
              <div className="timestamp">{currentDateTime}</div>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
              style={{ 
                backgroundColor: noiseInfo.color,
                opacity: isSubmitting ? 0.7 : 1 
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Noise Report"}
            </button>
          </form>
        </section>
      </main>

      {submissionStatus && (
        <div className={`status-popup ${submissionStatus}`}>
          {submissionStatus === "success" ? (
            <Check size={20} />
          ) : (
            <XCircle size={20} />
          )}
          <p>{statusMessage}</p>
          <button onClick={() => setSubmissionStatus(null)}>×</button>
        </div>
      )}

      {showInfoPopup && (
        <div className="info-popup">
          <div className="info-popup-content">
            <h3>Understanding Noise Levels</h3>
            <button className="close-button" onClick={() => setShowInfoPopup(false)}>×</button>
            
            <div className="noise-scale">
              {noiseLevelReference.map((item) => (
                <div className="noise-scale-item" key={item.level}>
                  <div className="noise-scale-bar" style={{ backgroundColor: item.color }}></div>
                  <div className="noise-scale-details">
                    <span className="noise-scale-level">{item.level} dB</span>
                    <span className="noise-scale-desc">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="noise-health-info">
              <h4>Health Impacts</h4>
              <p>Prolonged exposure to noise levels above 70dB can lead to hearing damage over time.</p>
              <p>Noise above 85 dB requires hearing protection for workplace safety.</p>
              <p>Even lower levels (50-60dB) can cause stress, sleep disturbance, and decreased productivity.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
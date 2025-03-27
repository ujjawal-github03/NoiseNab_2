import React from "react";
import { Volume2, Map, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./App.css";

function NoiseMap() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <Volume2 size={36} />
          <h1>NoiseNab</h1>
        </div>
        <p className="tagline">Noise Pollution Map</p>
      </header>

      <main className="main-content">
        <section className="map-section" style={{ height: "80vh" }}>
          <h2>Noise Pollution Map</h2>
          <div className="placeholder-message" style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "100%",
            textAlign: "center",
            padding: "2rem"
          }}>
            <Map size={64} style={{ marginBottom: "1rem", opacity: 0.6 }} />
            <h3>Noise Map Coming Soon</h3>
            <p>We're aggregating noise data from our users to create detailed noise pollution maps.</p>
            <p>Check back soon to see noise hotspots in your area!</p>
            
            <Link to="/" style={{ 
              display: "flex", 
              alignItems: "center", 
              marginTop: "2rem",
              padding: "0.8rem 1.5rem",
              borderRadius: "50px",
              backgroundColor: "#00bcd4",
              color: "white",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textDecoration: "none"
            }}>
              <ArrowLeft size={18} style={{ marginRight: "0.5rem" }} />
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NoiseMap;
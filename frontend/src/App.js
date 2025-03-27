import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NoiseDataEntry from "./NoiseDataEntry"; // This will be your existing noise data component
import Landing from "./Landing"; 
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page as the default route */}
        <Route path="/" element={<Landing />} />
        
        {/* Your existing noise data entry page */}
        <Route path="/enter-noise-data" element={<NoiseDataEntry />} />
        
        {/* Placeholder for the noise map page -*/}
        {/* <Route path="/noise-map" element={<NoiseMap />} /> */}

        {/* Placeholder for the hotspot page -*/}
        <Route
          path="/htmlpage"
          element={
            <div style={{ width: "100vw", height: "100vh" }}>
              <iframe
                src="/map.html"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Hotspot Map"
              />
            </div>
          }
        />
        
        {/* Redirect any unknown routes back to the landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
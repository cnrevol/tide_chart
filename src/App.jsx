import React, { useState, useEffect } from 'react';
import LocationManager from './components/LocationManager';
import TideChart from './components/TideChart';
import { getTideData } from './services/tideService';
import './index.css';

function App() {
  const [location, setLocation] = useState(null);
  const [tideData, setTideData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLocationSelect = async (loc) => {
    setLocation(loc);
    setLoading(true);
    try {
      // Format date as yyyyMMdd
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const data = await getTideData(loc.lng, loc.lat, date);
      console.log('[App] Received tide data:', data);
      setTideData(data);
    } catch (error) {
      console.error("Failed to fetch tide data", error);
      alert("Failed to fetch tide data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌊 Real-time Tide Chart</h1>
        <p className="subtitle">Select a location to see tide forecast</p>
      </header>

      <main className="app-content">
        <section className="location-section">
          <LocationManager onLocationSelect={handleLocationSelect} />
          {location && (
            <div className="location-info">
              Selected: {location.lng.toFixed(4)}, {location.lat.toFixed(4)}
            </div>
          )}
        </section>

        <section className="chart-section">
          {loading && <div className="loading">Loading tide data...</div>}

          {!loading && tideData && (
            <TideChart data={tideData} currentTime={currentTime} />
          )}

          {!loading && !tideData && !location && (
            <div className="placeholder">
              Please select a location on the map or use "Get Current Location".
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Data provided by QWeather • Map by Amap</p>
      </footer>
    </div>
  );
}

export default App;

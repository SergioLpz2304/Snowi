import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./SnowMap.css"; // Import CSS for styling

const SnowMap = () => {
  return (
    <div className="map-container">
      <MapContainer center={[45.4215, -75.6972]} zoom={12} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>

      {/* Floating Button for Reporting an Issue (No Navigation Logic) */}
      <button className="report-button" onClick={openForm()}>
        Report an Issue
      </button>
    </div>
  );
};

export default SnowMap;
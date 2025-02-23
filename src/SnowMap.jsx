import React, {useState} from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./SnowMap.css"; // Import CSS for styling
import { openForm } from "./script";

const SnowMap = () => {
  const [page, setPage] = useState("map");

  const handleClicked = () => {
    setPage("report");
  }

  return (
    <div className="map-container">

      
    
      { page === "map" ? <>
        <MapContainer center={[45.4215, -75.6972]} zoom={12} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>


      <button className="report-button" onClick={handleClicked}>
        Report an Issue
      </button></> : 
  
      <>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "auto" }}>

        <h1>
          <img src="/src/Assests/Snow.svg" alt="Logo" style={{ height: "30px", verticalAlign: "middle" }} />
        </h1>
        <h2>Report Snow Issue</h2>
            <label for="location">Location:</label>
            <input type="text" id="location" placeholder="Enter location" />
            <label for="issueType">Issue Type:</label>
            <select id="issueType">
                <option value="Ping Snow Removers">Ping Snow Removers</option>
                <option value="Pay to Clean">Pay to Clean</option>
                <option value="Volunteer to Clean">Volunteer to Clean</option>
            </select>
            <label for="description">Description:</label>
            <textarea id="description" placeholder="Enter description"></textarea>
            <button href="#" id="submitButton" onclick="submitReport()">Submit Report</button>



      </div>


      </>
      

      }

    </div>
  );
};

export default SnowMap;
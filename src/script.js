import L from 'leaflet';
import { db } from './firebase';

// Initialize Map
function initMap() {
    var map = L.map('map').setView([43.7, -79.4], 10); // Toronto as default location

    // Load OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    loadReports(map);  // Load reports onto the map
}
window.onload = initMap;

// export function openForm() {
//     // document.getElementById("reportForm").style.display = "block";
//     // render a new Report issue component
// }

export function submitReport() {
    let location = document.getElementById("location").value;
    let issueType = document.getElementById("issueType").value;
    let description = document.getElementById("description").value;

    // Add the report to Firestore
    db.collection("reports").add({
        location,
        issueType,
        description,
        timestamp: new Date().getUTCDate()
    }).then(() => {
        alert("Report Submitted!");
        document.getElementById("reportForm").style.display = "none";
    }).catch(error => {
        console.error("Error submitting report: ", error);
        alert("Error submitting report.");
    });
}

export function loadReports(map) {
    db.collection("reports").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        snapshot.forEach(doc => {
            let data = doc.data();
            let marker = L.marker([43.7, -79.4]).addTo(map) // Default Toronto, change later
                .bindPopup(`<b>${data.issueType}</b><br>${data.description}`);
        });
    });
}

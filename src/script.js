// Initialize Map
export function initMap() {
    var map = L.map('map').setView([43.7, -79.4], 10); // Toronto as default location

    // Load OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    loadReports(map);  // Load reports onto the map
}
window.onload = initMap;

export function openForm() {
    document.getElementById("reportForm").style.display = "block";
}

export function submitReport() {
    let location = document.getElementById("location").value;
    let issueType = document.getElementById("issueType").value;
    let description = document.getElementById("description").value;

    // Send the report to the backend API
    fetch('/reportSnowIssue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location, issueType, description })
    }).then(response => {
        if (response.ok) {
            alert("Report Submitted!");
            document.getElementById("reportForm").style.display = "none";
        } else {
            alert("Error submitting report.");
        }
    }).catch(error => {
        console.error("Error submitting report: ", error);
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

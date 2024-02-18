// configure map to boston (zoom, magnification, location)
let config = {
    minZoom: 7,
    maxZoom: 18,
};
const zoom = 15;
const lat = 42.36114;
const lng = -71.05708;

// fetch traffic signals data
fetch('traffic_signals.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); // log data to console just to check
        manipulateData(data); // prep data manipulation function
    })
    .catch(error => console.error("Fetching error:", error));


// all of this is earth distance calculation stuff. help from chatgpt thank u :)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // earth!
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // distance in kilometers

    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}


// array for stoplight data
let stoplights = [];

// function to process/store traffic_signals.json data
function manipulateData(data) {
    stoplights = data.map(item => ({
        name: item.Location,
        latitude: item.Y,
        longitude: item.X
    }));
    console.log(stoplights); // Just to verify
}

// Function to find the nearest stoplight given a click location
function findNearestStoplight(lat, lng) {
    let nearest = null;
    let nearestDistance = Infinity;

    stoplights.forEach(light => {
        const distance = calculateDistance(lat, lng, light.latitude, light.longitude);
        if (distance < nearestDistance) {
            nearest = light;
            nearestDistance = distance;
        }
    });

    return {
        nearest,
        nearestDistance
    };
}

// reset marker code/functions
let markers = [];

function clearMarkers() {
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = []; // Reset the markers array
}


// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Load and display tile layers on the map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// obtaining coordinates after clicking on the map
// attribution https://github.com/tomickigrzegorz/leaflet-examples/tree/master
map.on("click", function(e) {
    clearMarkers();
    
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    const {
        nearest,
        nearestDistance
    } = findNearestStoplight(lat, lng);

        // Add the clicked location marker
        const selectedLocationMarker = L.marker([lat, lng]).addTo(map).bindPopup("Selected location");
        markers.push(selectedLocationMarker); // Track the marker
    
        // Add the nearest stoplight marker, if found
        if (nearest) {
            const nearestStoplightMarker = L.marker([nearest.latitude, nearest.longitude]).addTo(map).bindPopup("Nearest stoplight");
            markers.push(nearestStoplightMarker); // Track the marker
        }
    
        const markerPlace = document.querySelector(".marker-position");
        markerPlace.textContent = `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`;
    
        const nearestLight = document.querySelector(".nearest-light");
        if (nearest) {
            // Converting distance to AMERICA CAW CAW units!
            nearestLight.textContent = `Nearest Stoplight: ${nearest.name}, Distance: ${(nearestDistance / 1.60934).toFixed(2)} miles`;
        } else {
            nearestLight.textContent = "No stoplights found.";
        }
    });
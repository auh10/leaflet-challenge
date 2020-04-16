// Store our API endpoint as queryUrl
let queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
  createFeatures(data);
});
function createFeatures(earthquakeData) {
  console.log('Earthquake Data', earthquakeData);
  // onEachFeature handler, takes feature and layer as params
  function featureParser(feature, layer){
    layer.bindPopup(`<h3>Magnitude:  ${feature.properties.mag}</h3><hr /><p>Location: ${feature.properties.place}</p>`)
  }
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: featureParser
  });
  createMap(earthquakes);
}

function createMap(earthquakes) {
  // Define streetmap and darkmap layers
  let streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  // Define a baseMaps object to hold our base layers
  let baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  // Define Overlay Maps
  let overlayMaps = {
    Earthquakes: earthquakes
  };
  // Create a new map
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });
  // Create a layer control containing our baseMaps
  // Be sure to add an overlay Layer containing the earthquake GeoJSON
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

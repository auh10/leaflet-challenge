
// Store our API endpoint as queryUrl
let queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
  createFeatures(data);
  // console.log(data);
});


// // Conditionals for magnitude
  function colorPicker(points){
    let result = 'red';
    if (mag > 3.0) {
      result = 'yellow';
    }
    else if (mag > 2.0) {
      result = 'blue';
    }
    else if (mag > 1) {
      result = 'green';
    }
    return result;
  }

function createFeatures(earthquakeData) {
  console.log('Earthquake Data', earthquakeData);
  // onEachFeature handler, takes feature and layer as params
  function featureParser(feature, layer) {
  //   //add circles to map
  //   L.circle(feature.properties.place, {
  //   fillColor: colorPicker(feature.properties.mag)
  //   // adjust radius to magnitude size
  //   radius: feature.properties.mag * 1000
  // })
      //add pop up when click
    layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><hr /><p>Location: ${feature.properties.place}</p>`)
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

  // //add markers
  // let myIcon = L.icon({
  //   iconUrl: 'earthquake.svg',
  //   iconSize: [38, 95],
  //   iconAnchor: [22, 94],
  //   popupAnchor: [-3, -76],
  // });
  // L.marker([50.505, 30.57], {icon: myIcon});


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
    collapsed: false,
  }).addTo(myMap);


  //////added marker
//   var marker = L.marker([45.52, -122.67], {
//     iconUrl: 'earthquake.svg',
//     iconSize: [38, 95],
//     iconAnchor: [2, 94],
//     draggable: true,
//   }).addTo(myMap);

}


// Set up the legend
// let legend = L.control({ position: "bottomright" });
// legend.onAdd = function() {
//   let div = L.DomUtil.create("div", "info legend");
//   let limits = geojson.options.limits;
//   let colors = geojson.options.colors;
//   let labels = [];

//   // Add min & max
//   let legendInfo = "<h1>Earthquake Magnitudes</h1>" +
//     "<div class=\"labels\">" +
//       "<div class=\"min\">" + limits[0] + "</div>" +
//       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//     "</div>";

//   div.innerHTML = legendInfo;

//   limits.forEach(function(limit, index) {
//     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//   });

//   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//   return div;
// };

// // Adding legend to the map
// legend.addTo(myMap);

// });








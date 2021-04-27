// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

 // Define streetmap and darkmap layers
 var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

   // Create our map, giving it the streetmap and earthquakes layers to display on load
   var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    // layers: [streetmap, earthquakes]
  });

  // add your streetmap tile layer
  streetmap.addTo(myMap);

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
    console.log(data);

    // assigns color of cirlce marker
    function getColor(depth) {
        switch (true) {
          case depth > 50:
            return  'orange';
        //   case 'Regen':
        //     return 'green';
        //   case 'LLU':
        //     return 'blue';
        //   case 'Colo':
        //     return 'purple';
        //   case 'DMSU':
        //     return 'blue';
        //   default:
        //     return 'white';
        }
      }

    function getRadius(mag) {
        if (mag == 0) { 
            return 1;
        }
        return mag * 4;
    }      

    L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng,  {radius: getRadius(feature.properties.mag), 
            fillOpacity: 1, 
            color: 'black', 
            fillColor: getColor(feature.geometry.coordinates[2]), 
            weight: 1,});
    },

  // Give each feature a popup describing the place and time of the earthquake
  onEachFeature : function(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "<hr><p>" + "Magnitude " + (feature.properties.mag) + "</p>");
  }
}).addTo(myMap);

});

// // <!-- LAYERS/SITES POP UP COLOUR CIRCLE MARKERS->
// function getColor(stype) {
//   switch (stype) {
//     case 'POP':
//       return  'orange';
//     case 'Regen':
//       return 'green';
//     case 'LLU':
//       return 'blue';
//     case 'Colo':
//       return 'purple';
//     case 'DMSU':
//       return 'blue';
//     default:
//       return 'white';
//   }
// }

// <!-- LAYERS/SITES ADD LAYER->
// L.geoJson(sites, {
//     pointToLayer: function (feature, latlng) {
//     return new L.CircleMarker(latlng, {radius: 8, 
//                                         fillOpacity: 1, 
//                                         color: 'black', 
//                                         fillColor: getColor(feature.properties.stype), 
//                                         weight: 1,});
//     },
//     onEachFeature: siteslabels
// }).addTo(map);

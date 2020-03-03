'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded twolaymap.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiZHd3YXdlcnUiLCJhIjoiY2s2dnJkdTd0MDBiZzNsbzh0cGIybGZmbSJ9.escl27EkMHCYKwLThisFkw'

// adding base map layer
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-86.2520, 41.6764], //South Bend, IN
    zoom: 12.5
});


// creating landplot owner, industry, and modern public parcel layer variables
var landplots_url = "./data/landplots.json"
var oldindust_url = "./data/industry.json"
var modpub_url = "./data/modern_pub.geojson"

// creating variable to overlay highlighted layers
//var overlay = document.getElementById('map-overlay');

//creating map
map.on('load',function() {
    // define a 'source' for landplot dataset
  map.addSource('landplots',{
    'type':'geojson',
    'data': landplots_url,
  });
  // add a new layer with landplots
  map.addLayer({
    'id':'landplots',
    'type':'fill',
    'source':'landplots',
    'paint':{
      'fill-color':'#82E0AA',
      'fill-outline-color' : '#F4F6F6'
    }
  })
  map.on('click', 'landplots', function(e) { 
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.Owner)
    .addTo(map);
    console.log(e.features)
    });
     
    // Change the cursor to a pointer when the mouse is over the land plots layer
    map.on('mouseenter', 'landplots', function() {
    map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'landplots', function() {
    map.getCanvas().style.cursor = '';
    });
  
    // define a 'source' for old industry dataset
  map.addSource('oldindustry',{
    'type':'geojson',
    'data': oldindust_url,
  });
  // add a new layer with old industry
  map.addLayer({
    'id':'oldindust',
    'type':'fill',
    'source':'oldindustry',
    'paint':{
      'fill-color':'#9B59B6',
      'fill-outline-color' : '#F4F6F6'
      
    }
  })
  map.on('click', 'oldindust', function(e) {
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setHTML(e.features[0].properties.Name)
  .addTo(map);
  console.log(e.features)
  });
   
  // Change the cursor to a pointer when the mouse is over the old industry layer
  map.on('mouseenter', 'oldindust', function() {
  map.getCanvas().style.cursor = 'pointer';
  });
   
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'oldindust', function() {
  map.getCanvas().style.cursor = '';
  });

  // Modern-day Public Properties Layer

     // define a 'source' for modern day public property dataset
     map.addSource('modern_pub',{
      'type':'geojson',
      'data': modpub_url,
    });
    // add a new layer with old industry
    map.addLayer({
      'id':'modern_pub',
      'type':'fill',
      'source':'modern_pub',
      'paint':{
        'fill-color':'#fcba03',
        'fill-outline-color' : '#fcba03'
        
      }
    })
    map.on('click', 'modern_pub', function(e) {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.name)
    .addTo(map);
    console.log(e.features)
    });
     
    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'modern_pub', function() {
    map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'modern_pub', function() {
    map.getCanvas().style.cursor = '';
    });
  
});


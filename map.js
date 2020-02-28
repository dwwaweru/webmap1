'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiZHd3YXdlcnUiLCJhIjoiY2s2dnJkdTd0MDBiZzNsbzh0cGIybGZmbSJ9.escl27EkMHCYKwLThisFkw'

// adding base map layer
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-86.2520, 41.6764], //South Bend, IN
    zoom: 12.5
});

// creating landplot owner & industry layer variables
var landplots_url = "./data/landplots.json"
var oldindust_url = "./data/industry.json"

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
  .setHTML(e.features[0].properties.name)
  .addTo(map);
  console.log(e)
  });
   
  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', 'oldindust', function() {
  map.getCanvas().style.cursor = 'pointer';
  });
   
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'oldindust', function() {
  map.getCanvas().style.cursor = '';
  });
});


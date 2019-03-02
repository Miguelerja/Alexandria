import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export default class Map extends Component {
    
  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
  });

  componentDidMount(){
    const { token } = this.props;
    const{ books } = this.props;

    const mapConfig = {
      container: 'map',
      style: 'mapbox://styles/ajer/cjsqedagl1fb51fnvxopap6mz',
      center: [2.15, 41.39], 
      zoom: 9,
    };
    
    mapboxgl.accessToken = token;
    
    this.map = new mapboxgl.Map(mapConfig);
    
    this.map.on('load', () => {
      // Add geolocate control to the map.
      this.map.addControl(this.geolocate);
      this.map.addLayer(
        {
          id: "symbols",
          type: "symbol",
          layout: {
            'icon-image': "book",
            },
        },
        books.forEach(book => {

          var markerDiv = document.createElement('div');
          markerDiv.className = 'marker';
          markerDiv.style.backgroundImage = 'url(https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fpaomedia%2Fsmall-n-flat%2F512%2Fcat-icon.png&f=1)';
          markerDiv.style.width = '20px';
          markerDiv.style.height = '20px';

          const popup = new mapboxgl.Popup({
            closeButton: false,
            className: 'popup',
          })
            .setHTML(`<button>${book.info.author}</button>`);
  
            new mapboxgl.Marker({
              color:'red'
            })
              .setLngLat(book.location.coordinates)
              .setPopup(popup)
              .addTo(this.map);
        })
      );
    });

    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    this.map.on('click', 'symbols', function (e) {
      this.map.flyTo({center: e.features[0].geometry.coordinates});
      });
  }

  render(){
    const { books } = this.props;
    return (
        <div className='map' id='map'></div>
    );
  }
}
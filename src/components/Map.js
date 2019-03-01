import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import 'mapbox-gl/dist/mapbox-gl.css'

export default class Map extends Component {

  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});

  componentDidMount(){
    const { token } = this.props;
    const mapConfig = {
      container: 'map',
      style: 'mapbox://styles/ajer/cjsp3c4s03rzb1gk4ocy4zckt',
      center: [41.39, 2.15], 
      zoom: 9,
    };

    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map(mapConfig);

    this.map.on('load', () => {
      // Add geolocate control to the map.
      this.map.addControl(this.geolocate);
      this.map.addControl(new mapboxgl.NavigationControl());
    });
  }

  render(){
    return (
      <div class='map' id='map'></div>
    );
  }
}
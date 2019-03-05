import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import { withAuth } from './AuthProvider';

class StoryMap extends Component {

  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });

  componentDidMount() {
    const mapConfig = {
      container: 'map',
      style: 'mapbox://styles/ajer/cjsqedagl1fb51fnvxopap6mz',
      center: [2, 41],
      zoom: 9,
    };

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    this.map = new mapboxgl.Map(mapConfig);

    this.map.on('load', () => {
      this.map.addControl(this.geolocate)
    })
  }

  render() {
    return (
      <div>
      <div ref={element => this.mapbox = element} className='map' id='map'></div>
      </div>
    )
  }
}


export default withAuth(StoryMap);
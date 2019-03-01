import React, { Component, PropTypes } from 'react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import '../styles/map.css';

class Map extends Component {

  componentDidMount() {
    MapboxGl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [2.188297, 41.388424],
      zoom: 16.6,
    })
  }

  render() {
    return (
      <div className='Map' ref={(x) => { this.container = x }}>
      </div>
    )
  }
}

export default Map
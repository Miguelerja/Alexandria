import React, { Component, PropTypes } from 'react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import '../styles/map.css';

<<<<<<< HEAD
//mapboxgl.accessToken =;

export default class Map extends Component {
=======
class Map extends Component {
>>>>>>> 281dd28e019181898898feb8f18531e0c2f17a8c

  componentDidMount() {
    MapboxGl.accessToken = 'pk.eyJ1IjoiYWplciIsImEiOiJjanNvd3N3NzEwYWN3NDNtenJuZzF2NzQxIn0.IdZ59iukLwHQ_Ak0yK8Ymw'

    new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/ajer/cjsp3c4s03rzb1gk4ocy4zckt',
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
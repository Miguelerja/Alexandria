import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import '../styles/marker.css';
import 'mapbox-gl/dist/mapbox-gl.css'

export default class Marker extends Component {

  componentDidMount(){
    this.marker = new mapboxgl.Marker()
      .setLngLat([41.39, 2.15]);
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}


import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withAuth } from '../components/AuthProvider';
import { withBooks } from '../components/BookProvider';
import { popUpCreator } from '../functions/popUpCreator';

class Map extends Component {
  state = {
    isLoggedIn: false,
    books: this.props.books,
  }

  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });

  handleUpdateBooks = () => {
    this.props.updateBooks();
  }

  componentDidMount() {
    const {
      books
    } = this.props;

    const mapConfig = {
      container: 'map',
      style: 'mapbox://styles/ajer/cjsqedagl1fb51fnvxopap6mz',
      center: [2, 41],
      zoom: 9,
    };

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    this.map = new mapboxgl.Map(mapConfig);

    this.map.on('load', () => {
      // Add geolocate control to the map.
      this.map.addControl(this.geolocate)

      books.forEach(book => {
        popUpCreator(book, this.map, this.props);
      });
    });
  }

  render() {
    return <div>
      <div ref={element => this.mapbox = element} className='map' id='map'></div>
    </div>
  }
}

export default withBooks(withAuth(Map));
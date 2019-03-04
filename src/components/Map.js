import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom';
import PopupCard from './PopupCard';

export default class Map extends Component {

  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });

  componentDidMount() {
    const {
      token,
      books
    } = this.props;
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
      books.forEach(book => {
        const markerDiv = document.createElement('div');
        markerDiv.className = 'marker-icon';
        markerDiv.setAttribute('id', `marker-icon-${book._id}`);
        let popupContent = document.createElement('div');
        popupContent.setAttribute('id', `popup-inner-cont-${book._id}`);

        const popup = new mapboxgl.Popup({
          closeButton: false,
          className: 'popup',
        })
        .setDOMContent(popupContent);

        const marker = new mapboxgl.Marker({
          element: markerDiv,
        })
        .setLngLat(book.location.coordinates)
        .setPopup(popup);

        const map = this.map;
        marker.addTo(map);

        console.log(marker);

        document.getElementById(`marker-icon-${book._id}`)
          .addEventListener('mouseenter', (event) => {
            if (!marker.getPopup().isOpen()) {
              marker.getPopup().addTo(map);
              ReactDOM.render( <PopupCard book = { book }/>,
                document.getElementById(`popup-inner-cont-${book._id}`)
              )
            }
          });
        });
    });
  }

  render() {
    return <div className='map' id='map'></div>
  }
}

import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import { withAuth } from '../providers/AuthProvider';
import './styles/storyMap.css';

class StoryMap extends Component {

  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });

  componentDidMount() {
    const { transactions, bookId } = this.props;
    const mapConfig = {
      container: 'map',
      style: 'mapbox://styles/ajer/cjsqedagl1fb51fnvxopap6mz',
      center: [2.1905327, 41.397765199999995],
      zoom: 9,
    };

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    this.map = new mapboxgl.Map(mapConfig);

    this.map.on('load', () => {
      this.map.addControl(this.geolocate);

      transactions.forEach(transaction => {
        if (transaction.bookId === bookId) {
          const markerDiv = document.createElement('div');
          markerDiv.className = 'marker-icon';
  
          const popup = new mapboxgl.Popup({
            closeButton: false,
            className: 'popup',
          })
            .setHTML(`<p>${transaction.story}</p>`);
        
          const marker = new mapboxgl.Marker({
            element: markerDiv,
          })
            .setLngLat(transaction.location.coordinates)
            .setPopup(popup);
        
          marker.addTo(this.map);
        }
      });
    });
  };

  render() {
    return (
      <div>
        <div ref={element => this.mapbox = element} className='story-map' id='map'></div>
      </div>
    )
  }
}


export default withAuth(StoryMap);
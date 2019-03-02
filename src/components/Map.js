import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom';
import TestComponent from './TestComponent';

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

          const popup = new mapboxgl.Popup({
            closeButton: false,
            className: 'popup',
          })
            .setHTML('');

          const marker =  new mapboxgl.Marker({
             color:'red'
           })
             .setLngLat(book.location.coordinates)
             .setPopup(popup);

           // marker.addTo(this.map)
            const map = this.map;
            marker.addTo(map);

            document.querySelector('.mapboxgl-marker')
              .addEventListener('mouseenter', () => {
                if (!marker.getPopup().isOpen()) {
                  marker.getPopup().addTo(map);
                  ReactDOM.render(
                    <TestComponent book={book} />,
                    document.querySelector('.mapboxgl-popup-content')
                  )
                }
            });
             
        })
      );
    });

    

    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    this.map.on('click', 'symbols', function (e) {
      this.map.flyTo({center: e.features[0].geometry.coordinates});
      });
  }

  render(){
    //const { books } = this.props;
    return (
        <div className='map' id='map'></div>
    );
  }
}
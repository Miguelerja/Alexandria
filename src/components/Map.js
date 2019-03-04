import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom';
import PopupCard from './PopupCard';
import { withAuth } from '../components/AuthProvider';
import { withBooks } from '../components/BookProvider';

class Map extends Component {

  state = {
    isLoggedIn: false,
  }

  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });

  componentDidMount() {
    const {
      books
    } = this.props;
    const mapConfig = {
      container: 'map',
      style: 'mapbox://styles/ajer/cjsqedagl1fb51fnvxopap6mz',
      center: [2.15, 41.39],
      zoom: 9,
    };

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

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
                ReactDOM.render( <PopupCard book = { book } cardId={`popup-inner-cont-${book._id}`}/>,
                  document.getElementById(`popup-inner-cont-${book._id}`)
                )
              }
            });
        });
    });
  }

  componentWillReceiveProps(prevProps) {
    if(JSON.stringify(this.props.isLogged) !== JSON.stringify(prevProps.isLogged)) {
      this.setState({
        isLoggedIn: !this.state.isLoggedIn,
      })
    }
  }

  render() {
    const { isLoggedIn } = this.state;
    return (isLoggedIn) ? <div className='map' id='map'></div> : <div className='map' id='map'></div>
  }
}

export default withBooks(withAuth(Map));
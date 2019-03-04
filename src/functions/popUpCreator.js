import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom';
import PopupCard from '../components/PopupCard';

export const popUpCreator = (book, mapboxMap, props) => {
  console.log(mapboxMap);
  const markerDiv = document.createElement('div');
    markerDiv.className = 'marker-icon';
    markerDiv.setAttribute('id', `${book._id}`);
  let popupContent = document.createElement('div');
    popupContent.setAttribute('id', `${book._id}`);

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

  const map = mapboxMap;
  marker.addTo(map);

  //document.getElementById(`${book._id}`)
  //  .addEventListener('mouseenter', (event) => {
  //    if (!marker.getPopup().isOpen()) {
  //      marker.getPopup().addTo(map);
  //      //ReactDOM.render( <PopupCard book={ book } {...props} cardId={`popup-inner-cont-${book._id}`}/>,
  //      //  document.getElementById(`popup-inner-cont-${book._id}`)
  //      //)
  //    }
  //  });
}//
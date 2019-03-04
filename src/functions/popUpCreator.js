import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';


export const popUpCreator = (book, mapboxMap, props) => {
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

}
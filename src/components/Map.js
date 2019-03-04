import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withAuth } from '../components/AuthProvider';
import { withBooks } from '../components/BookProvider';
import { popUpCreator } from '../functions/popUpCreator';
import ReactDOM from 'react-dom';
import TestComponent from './TestComponent';

class Map extends Component {

  state = {
    isLoggedIn: false,
    books: this.props.books,
    isPopUpOpen: false,
    nodeList: [],
  }

  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });

  handleUpdateBooks = () => {
    console.log(this.props);
    this.props.updateBooks();
  }

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
        popUpCreator(book, this.map, this.props);
      });
    });

    const nodeList = document.querySelectorAll('.mapboxgl-popup-content');
        if (nodeList.length > 0) {
            this.setState({
                nodeList
            });
        }

    const mutationObserver = new MutationObserver(mutations => {
          console.log(this.state.nodeList)
          mutations.forEach(mutation => {
              const newNodes = mutation.addedNodes;
              newNodes.forEach(node => {
                  if (node.classList && node.classList.contains('mapboxgl-popup-content')) {
                      this.setState(prevState => ({nodeList: [node]}));
                  }
              });
          });
      });
      mutationObserver.observe(document.body, {
          attributes: false,
          characterData: false,
          childList: true,
          subtree: true,
          attributeOldValue: false,
          characterDataOldValue: false
      });
    
  }

  render() {
    const nodeList = [...this.state.nodeList];
    const portals = (nodeList.length > 0) ? nodeList.map((node, i) =>
        (
            <PopUpPortal key={i} node={node}>
              <div>
                <p>
                  {this.props}
                </p>
              </div>
            </PopUpPortal>
        )

    ) : null;
    return <div>
      <div className='map' id='map'></div>
      {portals}
    </div>
  }
}

class PopUpPortal extends Component {
  render() {
      return ReactDOM.createPortal(this.props.children, this.props.node);
  }
}

export default withBooks(withAuth(Map));
import React, {Component} from 'react';
import {Marker} from 'react-map-gl';

export default class Pointer extends Component {
  _render() {
    const {longitude, latitude} = this.props;

    const [x, y] = this._context.viewport.project([longitude, latitude]);

    const markerStyle = {
      position: 'absolute',
      background: '#fff',
      left: x,
      top: y
    };

    return (
        <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
          <div>You are here</div>
        </Marker>
    );
  }
}

import React, { Component } from 'react'
import './styles/loadingscreen.css';

export default class LoadingScreen extends Component {
  render() {
    return (
      <div>
        <div className="background-image-loading"></div>
        <div className="background-text">
          <h1>Alexandria</h1>
          <p>Create an account or login to start the book hunt</p>
        </div>
      </div>
    )
  }
}

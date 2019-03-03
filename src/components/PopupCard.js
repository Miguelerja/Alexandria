import React, { Component } from 'react';
import bookService from '../lib/book-service';
import '../styles/popupcard.css';

export default class PopupCard extends Component {

  state = {
    showCaptureMenu: false,
  }

  showCaptureMenu = () => {
    this.setState({ showCaptureMenu: !this.state.showCaptureMenu, });
  }

  handleClickCapture = (event) => {
    this.showCaptureMenu();
    event.stopPropagation();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleBookCodeInput = () => {

  }

  handleLoss = () => {
    
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { title, author, synopsis } = this.props.book.info;
    return (
      <div className="popup-card-content-container">
        <div className="typewriter">
          <h1>{title}</h1>
        </div>
        <span>{author}</span>
        <span>{synopsis}</span>
        <button onClick={this.handleClickCapture}>Capture</button>
        {(this.state.showCaptureMenu ? 
        <div className="book-capture-input-container" ref={(element) => {this.captureMenu = element;}}>
          <input 
            type="text"
            name="code" 
            onChange={this.handleChange} 
            value={this.state.bookCode}
            placeholder="Enter book code"
          />
          <button onClick={this.handleBookCodeInput}>Enter code</button>
        </div>
        :
        <button onClick={this.handleLoss}>Declare it lost</button>
        )}
      </div>
    )
  }
}

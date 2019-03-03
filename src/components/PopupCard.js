import React, { Component } from 'react';
import bookService from '../lib/book-service';

export default class PopupCard extends Component {

  state = {
    captured: false,
  }

  handleCapture = () => {
    this.setState({
      captured: !this.state.captured,
    })
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

  render() {
    const { title, author, synopsis } = this.props.book.info;
    return (
      <div>
        <h1>{title}</h1>
        <p>{author}</p>
        <p>{synopsis}</p>
        <button onClick={this.handleCapture}>Capture</button>
        {(this.state.captured ? 
        <div>
          <input 
            type="text"
            name="code" 
            onChange={this.handleChange} 
            value={this.state.bookCode}
            placeholder="Enter book code"
          />
          <button onclick={this.handleBookCodeInput}>Enter code</button>
        </div>
        :
        <button onClick={this.handleLoss}>Declare it lost</button>
        )}
      </div>
    )
  }
}

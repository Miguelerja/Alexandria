import React, { Component } from 'react';
import bookService from '../lib/book-service';
import '../styles/popupcard.css';
import transactionService from '../lib/transaction-service';


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
    const { code } = this.state;
    const { _id } = this.props.book;
    const userThatFrees = this.props.user._id;
    const book = {
      id: _id,
      code: code,
    };
    bookService.capture(book)
    .then((book) => {
      transactionService.update(_id, userThatFrees)
        .then((transaction) => console.log(transaction))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error));
  }

  handleLoss = () => { // TODO Not working error 404
    const { _id } = this.props.book;
    const book = {
      id: _id,
      strikes: 1,
    };
    bookService.setStrikes(book)
    .then((book) => console.log(book))
    .catch(error => console.log(error));
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

import React, { Component } from 'react';
import bookService from '../lib/book-service';
import '../styles/popupcard.css';
import transactionService from '../lib/transaction-service';
import ReactDOM from 'react-dom';


class PopupCard extends Component {

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
    const bookCode = this.state.code;
    const bookId = this.props.book._id;
    const book = {
      id: bookId,
      code: bookCode,
    };

    bookService.capture(book)
    .then((book) => {
      const userThatHunts = this.props.user._id;
      transactionService.update(bookId, userThatHunts)
        .then((transaction) => console.log(transaction))
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  }

  handleLoss = () => {
    const { _id } = this.props.book;
    const book = {
      id: _id,
      strikes: 1,
    };
    bookService.setStrikes(book)
    .then((book) => console.log(book))
    .then((book) => {
      ReactDOM.unmountComponentAtNode(document.getElementById(this.props.cardId));
      this.props.updateBooks();
    })
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

export default PopupCard;
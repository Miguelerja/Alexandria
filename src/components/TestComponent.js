import React, { Component } from 'react'
import bookService from '../lib/book-service';
import '../styles/popupcard.css';
import transactionService from '../lib/transaction-service';

/* Component that gets passed through Map Portal to insert inner popup content
and functionality */

export default class TestComponent extends Component {

  state = {
    books: this.props.books,
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
    const bookId = this.state.book._id;
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
    .then(this.props.history.push(`/book/${bookId}`))
    .catch(error => console.log(error));
  }

  handleLoss = () => {
    const { _id } = this.state.book;
    const book = {
      id: _id,
      strikes: 1,
    };
    bookService.setStrikes(book)
    .then((book) => console.log(book))
    .then((book) => {
      this.props.updateBooks();
    })
    .catch(error => console.log(error));
  }

  componentDidMount() {
    const idToFind = this.props.node.firstChild.getAttribute('id');
    const {books} = this.props;
    const rightBook = books.find((book) => {
      return book._id === idToFind;
    })
    this.setState({
      book: rightBook,
    })
  }

  render() {
    const {book} = this.state;
    return (
      <>
        {(this.state.book !== undefined) ?
        <>
        <div className="typewriter">
          <h1>{book.info.title}</h1>
        </div>
        <span>{book.info.author}</span>
        <span>{book.info.synopsis}</span>
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
        </>
        : null }
      </>
    )
  }
}

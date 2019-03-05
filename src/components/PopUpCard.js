import React, { Component } from 'react'
import bookService from '../lib/book-service';
import '../styles/popupcard.css';
import transactionService from '../lib/transaction-service';

/* Component that gets passed through Map Portal to insert inner popup content
and functionality */

export default class PopUpCard extends Component {

  state = {
    books: this.props.books,
    showCaptureMenu: false,
  }

  showCaptureMenu = () => {
    this.setState({ 
      showCaptureMenu: !this.state.showCaptureMenu, 
    });
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
    const bookId = this.state.rightBook._id;
    const book = {
      id: bookId,
      code: bookCode,
    };

    if (this.state.rightBook.code === bookCode) {
      bookService.capture(book)
        .then((book) => {
        const userThatHunts = this.props.user._id;
        transactionService.update(bookId, userThatHunts)
          .then((transaction) => this.props.updateBooks())
          .catch(error => console.log(error));
      })
      /* This redirect seems to work but component is hidden behind the rest */
      .then(this.props.history.push(`/book/${bookId}`))
      .catch(error => console.log(error));
    }
  }

  handleLoss = () => {
    const { _id } = this.state.rightBook;
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
      rightBook: rightBook,
    })
  }

  render() {
    const {rightBook} = this.state;
    return (
      <>
        {(this.state.rightBook !== undefined) ?
        <div className="popup-portal-content">
          <div className="typewriter">
            <h1>{rightBook.info.title}</h1>
          </div>
          <span>{rightBook.info.author}</span>
          <span>{rightBook.clue}</span>
          <button ref={element => this.captureButton = element} onClick={this.handleClickCapture}>Capture</button>
          {(this.state.showCaptureMenu ? 
          <div className="book-capture-input-container" ref={(element) => {this.captureMenu = element;}}>
            <input 
              type="text"
              name="code" 
              onChange={this.handleChange} 
              value={this.state.code}
              placeholder="Enter book code"
            />
            <button onClick={this.handleBookCodeInput}>Enter code</button>
          </div>
          :
          <button onClick={this.handleLoss}>Declare it lost</button>
          )}
        </div>
        : null }
      </>
    )
  }
}

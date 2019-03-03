import React, { Component } from 'react';
import bookService from '../lib/book-service';
import transactionService from '../lib/transaction-service';

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
          <button onClick={this.handleBookCodeInput}>Enter code</button>
        </div>
        :
        <button onClick={this.handleLoss}>Declare it lost</button>
        )}
      </div>
    )
  }
}

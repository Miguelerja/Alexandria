import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import bookService from '../lib/book-service';
import transactionService from '../lib/transaction-service';
import '../styles/createbook.css';
import { withBooks } from '../components/BookProvider';
import { Provider, Consumer } from '../components/BookProvider';
import { withRouter } from "react-router";

class CreateBook extends Component {

  state={};

  handleBooksListUpdate = (data) => {
  };

  handleFormSubmit = (event) => {
    const { title, author, synopsis, story, clue } = this.state;
    const { coordinates } = this.props;
    const book = {
      info: {
        title: title,
        author: author,
        synopsis: synopsis,
        story: story,
      },
      clue: clue,
      location: {
        type: 'point',
        coordinates: coordinates,
      }
    };
    bookService.create(book)
      .then((book) => {
        console.log('whole book', book);
        console.log('book code', book.code)
        const bookId = book.response._id;
        const { location } = book.response;
        const { story } = book.response.info;
        const userThatFrees = this.props.user._id;
        const transaction = {
          bookId,
          userThatFrees,
          location,
          story,
        };

        transactionService.create(transaction)
          .then(transaction => console.log(transaction))
          .catch(error => console.log(error));

        this.setState({
          title: '',
          author: '',
          synopsis: '',
          story: '',
          clue: '',
          coordinates: [],
        });
      })
      .then(() => {
        console.log(this.props)
        this.props.updateBooks(this.state)
      })
      .catch(error => console.log(error));
    
    event.preventDefault();
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { author, title, synopsis, story, clue } = this.state;
    return (
      <div className="form">
        <input className="input text-input" type="text" name="title" placeholder="Book title" value={title} onChange={this.handleChange}/>
        <input className="input text-input" type="text" name="author" placeholder="Author" value={author} onChange={this.handleChange}/>
        <input className="input text-input" type="text" name="synopsis" placeholder="Synopsis" value={synopsis} onChange={this.handleChange}/>
        <input className="input text-input" type="text" name="story" placeholder="Your story" value={story} onChange={this.handleChange}/>
        <input className="input text-input" type="text" name="clue" placeholder="Clue" value={clue} onChange={this.handleChange} />
        <input className="input button" type="submit" value="Create" onClick={this.handleFormSubmit} />
      </div>
    )
  }
}

export default withRouter(withAuth(withBooks(CreateBook)))

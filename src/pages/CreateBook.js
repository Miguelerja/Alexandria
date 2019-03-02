import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import bookService from '../lib/book-service';
import transactionService from '../lib/transaction-service';
import '../styles/createbook.css';
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
        const bookId = book.response._id;
        const userThatFrees = this.props.user._id;
        const transaction = {
          bookId,
          userThatFrees,
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
      }).catch(error => console.log(error));
    
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

export default withAuth(CreateBook)

import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import bookService from '../lib/book-service';
import transactionService from '../lib/transaction-service';
import BookCode from '../components/BookCode';
import '../styles/createbook.css';
class CreateBook extends Component {

  state={
    code: '',
    submitClicked: false,
  };

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
        const bookTitle = book.response.info.title;
        const bookId = book.response._id;
        const { location } = book.response;
        const { story } = book.response.info;
        const userThatFrees = this.props.user._id;
        const transaction = {
          bookTitle,
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
          code: book.response.code,
          submitClicked: true,
        });
      }).catch(error => console.log(error));
    
    event.preventDefault();
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const {
      author,
      title,
      synopsis,
      story,
      clue,
      code,
      submitClicked
    } = this.state;
    return (
      <>
        {(submitClicked) ?
          <BookCode code={code}/>
          :
          <div className="create-book-form">
            <input 
              className="create-book-input text-input"
              type="text" name="title" 
              placeholder="Book title" 
              value={title}
              onChange={this.handleChange}/>
            <input 
              className="create-book-input text-input"
              type="text" name="author" 
              placeholder="Author" 
              value={author}
              onChange={this.handleChange}/>
            <input 
              className="create-book-input text-input big-input"
              type="text" name="synopsis" 
              placeholder="Synopsis" 
              value={synopsis}
              onChange={this.handleChange}/>
            <input 
              className="create-book-input text-input big-input"
              type="text" name="story" 
              placeholder="Your story" 
              value={story}
              onChange={this.handleChange}/>
            <input 
              className="create-book-input text-input big-input"
              type="text" name="clue" 
              placeholder="Clue" 
              value={clue}
              onChange={this.handleChange} />
            <input 
              className="create-book-input create-book-button"
              type="submit" 
              value="Create"
              onClick={this.handleFormSubmit} />
          </div>
        }
      </>
    )
  }
}

export default withAuth(CreateBook)

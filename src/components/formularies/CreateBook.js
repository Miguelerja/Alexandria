import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import bookService from '../../lib/book-service';
import transactionService from '../../lib/transaction-service';
import BookCode from './BookCode';
import './styles/forms.css';

class CreateBook extends Component {

  state={
    code: '',
    submitClicked: false,
    titleShown: true,
    authorShown: false,
    storyShown: false,
    clueShown: false,
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

  handleClick = (event) => {
    event.preventDefault();
    switch(event.target.value){
      case 'Confirm title':
        return this.setState({
          titleShown: !this.state.titleShown,
          authorShown: !this.state.authorShown,
        });
    case 'Confirm author':
      return this.setState({
        authorShown: !this.state.authorShown,
        storyShown: !this.state.storyShown,
      });
    case 'Confirm story':
      return this.setState({
        storyShown: !this.state.storyShown,
        clueShown: !this.state.clueShown,
      });
    default:
      return this.state;
    }
  }

  
  render() {
    const {
      author,
      title,
      story,
      clue,
      code,
      submitClicked,
      titleShown,
      authorShown,
      storyShown,
      clueShown,
    } = this.state;
    return (
      <>
        {(submitClicked) ?
          <BookCode code={code}/>
          :
          <div ref={(element) => {this.createBookForm = element}} className="create-book-form">
            <button
              className="close-bookadd-button"
              onClick={this.props.handleFormClose}>
                < FontAwesomeIcon icon={faTimes} />
              </button>
            {(titleShown) ?
              <>
                <input 
                  className="create-book-input text-input"
                  type="text" name="title" 
                  placeholder="Book title" 
                  value={title || ''}
                  onChange={this.handleChange}/>
                <button
                  className="formulary-next-button"
                  value="Confirm title"
                  onClick={this.handleClick}
                >Confirm title
                </button>
              </>
            : 
            null}

            {(authorShown) ? 
              <>
                <input 
                  className="create-book-input text-input"
                  type="text" name="author" 
                  placeholder="Author" 
                  value={author || ''}
                  onChange={this.handleChange}/>
                <button
                  className="formulary-next-button"
                  value="Confirm author"
                  onClick={this.handleClick}
                >Confirm author
                </button>
              </>
            : 
            null}

            {(storyShown) ?
              <>
                <input
                  className="create-book-input text-input big-input"
                  type="text" name="story" 
                  placeholder="Your story" 
                  value={story || ''}
                  onChange={this.handleChange}/>
                <button
                  className="formulary-next-button"
                  value="Confirm story"
                  onClick={this.handleClick}
                >Confirm story
                </button>
              </>
            : 
            null}

            {(clueShown) ?
              <>
                <input 
                  className="create-book-input text-input big-input"
                  type="text" name="clue" 
                  placeholder="Clue" 
                  value={clue || ''}
                  onChange={this.handleChange}/>
                <button
                  className="create-book-input create-book-button"
                  type="submit"
                  onClick={this.handleFormSubmit} >Create
                </button>
              </>
            : 
            null}
          </div>
        }
      </>
    )
  }
}


export default withAuth(CreateBook)

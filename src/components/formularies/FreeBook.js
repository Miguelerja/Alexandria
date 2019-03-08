import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import bookService from '../../lib/book-service';
import transactionService from '../../lib/transaction-service';
import { withAuth } from '../providers/AuthProvider';
import BookCode from './BookCode';
import './styles/forms.css';

class FreeBook extends Component {

  state={
    code: '',
    codeShown: true,
    storyShown: false,
    clueShown: false,
    submitClicked: false,
  };

  setCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        coordinates: [position.coords.longitude, position.coords.latitude]
      }) 
    })
  };

  componentDidMount() {
    this.setCoordinates();
  }

  handleFormSubmit = (event) => {
    const { code, clue, story, coordinates } = this.state;

    const book = {
      code: code,
      clue: clue,
      info: {
        story: story,
      },
      location: {
        type: 'point',
        coordinates: coordinates,
      },
    };

    bookService.setFreeAgain(book)
      .then((book) => {
        const bookId = book.response._id;
        const { location } = book.response;
        const { story } = book.response.info;
        const userThatFrees = this.props.user._id;

        const transaction = {
          bookId,
          location,
          story,
          userThatFrees,
        }

        transactionService.create(transaction)
          .then(transaction => console.log(transaction))
          .catch(error => console.log(error));

        this.setState({
          code: '',
          clue: '',
          story: '',
          submitClicked: true,
        });
      })
      .then(() => this.props.updateBooks())
      .catch(error => console.log(error));

    event.preventDefault();
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleClick = (event) => {
    event.preventDefault();
    switch(event.target.value){
      case 'Confirm code':
        return this.setState({
          codeShown: !this.state.codeShown,
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
      code,
      clue,
      story,
      codeShown,
      clueShown,
      storyShown,
      submitClicked,
    } = this.state;

    return (
      <>
        {(submitClicked) ? 
          <BookCode code={code} />
          :          
          <div ref={(element) => {this.dropdownMenu = element}} className="create-book-form">
            <button 
              className="close-bookadd-button"
              onClick={this.props.handleFormClose}>
                < FontAwesomeIcon icon={faTimes} />
            </button>
            {(codeShown) ? 
            <>
              <input 
                className="create-book-input text-input"
                type="text" 
                name="code" 
                placeholder="Enter book code" 
                value={code || ''}
                onChange={this.handleChange}/>
              <button
                className="formulary-next-button"
                value="Confirm code"
                onClick={this.handleClick}
              >Confirm code
              </button>
            </>
            :
            null}

            {(storyShown) ? 
            <>
              <input 
                className="create-book-input text-input big-input"
                type="text" 
                name="story" 
                placeholder="Enter your story" 
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
                type="text" 
                name="clue" 
                placeholder="Enter clue" 
                value={clue || ''}
                onChange={this.handleChange}/>
              <button
                className="formulary-next-button"
                type="submit" 
                onClick={this.handleFormSubmit} 
              >Create
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

export default withAuth(FreeBook);

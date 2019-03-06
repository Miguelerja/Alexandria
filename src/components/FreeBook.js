import React, { Component } from 'react'
import bookService from '../lib/book-service';
import transactionService from '../lib/transaction-service';
import { withAuth } from './AuthProvider';

class FreeBook extends Component {

  state={
    code: '',
    codeShown: true,
    storyShown: false,
    clueShown: false,
    buttonShown: false,
  }

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
    case 'Confirm clue':
      return this.setState({
        clueShown: !this.state.clueShown,
        buttonShown: !this.state.buttonShown,
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
      buttonShown,
    } = this.state;

    return (
      <div>
        <form className="free-book-form">
          {(codeShown) ? 
          <>
            <input 
              type="text" name="code" 
              placeholder="Enter book code" 
              value={code}
              onChange={this.handleChange}/>
            <input
              className="formulary-next-button"
              value="Confirm code"
              onClick={this.handleClick}
            />
          </>
          :
          null}

          {(storyShown) ? 
          <>
            <input 
              type="text" name="story" 
              placeholder="Enter your story" 
              value={story}
              onChange={this.handleChange}/>
            <input
              className="formulary-next-button"
              value="Confirm story"
              onClick={this.handleClick}
            />
          </>
          :
          null}

          {(clueShown) ? 
          <>
            <input 
              type="text" name="clue" 
              placeholder="Enter clue" 
              value={clue}
              onChange={this.handleChange}/>
            <input
              className="formulary-next-button"
              value="Confirm clue"
              onClick={this.handleClick}
            />
          </>
          :
          null}

          {(buttonShown) ? 
            <input 
              type="submit" 
              value="Create"
              onClick={this.handleFormSubmit} 
            />          
          :
          null}

        </form>
      </div>
    )
  }
}

export default withAuth(FreeBook);

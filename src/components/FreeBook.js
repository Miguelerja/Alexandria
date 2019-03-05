import React, { Component } from 'react'
import bookService from '../lib/book-service';
import transactionService from '../lib/transaction-service';
import { withAuth } from './AuthProvider';

class FreeBook extends Component {

  state={
    code: '',
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

  render() {
    const { code, clue, story } = this.state;
    return (
      <div>
        <form className="free-book-form">
          <input 
            type="text" name="code" 
            placeholder="Enter book code" 
            value={code}
            onChange={this.handleChange}/>
          <input 
            type="text" name="clue" 
            placeholder="Enter clue" 
            value={clue}
            onChange={this.handleChange}/>
          <input 
            type="text" name="story" 
            placeholder="Enter your story" 
            value={story}
            onChange={this.handleChange}/>
          <input 
            type="submit" 
            value="Create"
            onClick={this.handleFormSubmit} />
        </form>
      </div>
    )
  }
}

export default withAuth(FreeBook);

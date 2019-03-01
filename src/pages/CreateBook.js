import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import bookService from '../lib/book-service';

class CreateBook extends Component {

  state = {
    info: "",
    clue: "",
    coordinates: [],
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
   
  }

  setCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        coordinates: [position.coords.latitude, position.coords.longitude]
      }) 
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { info, clue } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          {/* Username and password input for login */}
          <input type="text" name="info" placeholder="info" value={info} onChange={this.handleChange}/>
          <input type="text" name="clue" placeholder="clue" value={clue} onChange={this.handleChange} />
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

export default withAuth(CreateBook)

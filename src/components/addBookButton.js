import React, { Component } from 'react'
import { withAuth } from './AuthProvider';
import '../styles/addBookButton.css';
import CreateBook from './formularies/CreateBook';
import FreeBook from './formularies/FreeBook';

class AddBookButton extends Component {

  state = {
    showMenu: false,
    showWithCodeMenu: false,
  }

  setCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        coordinates: [position.coords.longitude, position.coords.latitude]
      }) 
    })
  };

  handleClick = () => {
    this.setCoordinates();
    this.setState({
      showMenu: !this.state.showMenu,
      showWithCodeMenu: false,
    })
  }

  handleClickBookWithCode = () => {
    this.setCoordinates();
    this.setState({
      showMenu: false,
      showWithCodeMenu: !this.state.showWithCodeMenu,
    })
  }

  render() {
    return (
      <>
        <div className="book-button-container">
          <div className="book">
            <div className="back"></div>
            <div className="page6" onClick={this.handleClickBookWithCode}>Leave behind a book you picked with a code</div>
            <div className="page5" onClick={this.handleClick}>📚</div>
            <div className="page4"></div>
            <div className="page3"></div>
            <div className="page2"></div>
            <div className="page1"></div>
            <div className="front">Click here to leave a book behind</div>
          </div>
        </div>
        
        {
          this.state.showMenu
            ? (
              < CreateBook handleClick={this.handleClick}
                  isVisible={this.state.showMenu}
                  coordinates={this.state.coordinates}
                  props={this.props} />
            )
            : (
              null
            )
        }
        {
          this.state.showWithCodeMenu
            ? (
              < FreeBook handleClick={this.handleClickBookWithCode}
                isVisible={this.state.showWithCodeMenu}
                coordinates={this.state.coordinates}
                props={this.props} />
            )
            : (
              null
            )
        }

      </>
    )
  }
}

export default withAuth(AddBookButton)

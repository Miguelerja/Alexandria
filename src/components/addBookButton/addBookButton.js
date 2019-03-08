import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faBook } from '@fortawesome/fontawesome-free-solid'
import './Styles/addBookButton.css';
import CreateBook from '../formularies/CreateBook';
import FreeBook from '../formularies/FreeBook';

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

  handleFormClose = () => {
    this.setState({
      showMenu: false,
      showWithCodeMenu: false,
    })
  }

  render() {
    return (
      <>
        <div className="book-button-container">
          <div className="book">
            <div className="back"></div>
            <div className="page6" onClick={this.handleClickBookWithCode}>
              < FontAwesomeIcon icon={faBookmark} />
            </div>
            <div className="page5" onClick={this.handleClick}>
              < FontAwesomeIcon icon={faBook} />
            </div>
            <div className="page4"></div>
            <div className="page3"></div>
            <div className="page2"></div>
            <div className="page1"></div>
            <div className="front"><div className="addbook-button-icon">+</div></div>
          </div>
        </div>
        
        {
          this.state.showMenu
            ? (
              < CreateBook handleClick={this.handleClick}
                  isVisible={this.state.showMenu}
                  coordinates={this.state.coordinates}
                  handleFormClose={this.handleFormClose}
                  updateBooks={this.props.updateBooks} />
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
                handleFormClose={this.handleFormClose}
                updateBooks={this.props.updateBooks} />
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

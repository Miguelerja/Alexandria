import React, { Component } from 'react'
import { withAuth } from './AuthProvider';
import '../styles/addBookButton.css';
import { Link } from 'react-router-dom';
import CreateBook from '../pages/CreateBook';

class AddBookButton extends Component {

  state = {
    showMenu: false,
  }

  handleClick = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }

  render() {
    return (
      <div>
        <Link className="add-book-button button" to="/books/create" onClick={this.handleClick} />
        
        {
          this.state.showMenu
            ? (
              < CreateBook handleClick={this.handleClick}
                  isVisible={this.state.showMenu}
                  props={this.props} />
            )
            : (
              null
            )
        }

      </div>
    )
  }
}

export default withAuth(AddBookButton)

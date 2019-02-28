import React, { Component } from 'react'
import { withAuth } from './AuthProvider';
import '../styles/addBookButton.css';

class AddBookButton extends Component {
  render() {
    return (
      <button className="add-book-button button">
        +
      </button>
    )
  }
}

export default withAuth(AddBookButton)

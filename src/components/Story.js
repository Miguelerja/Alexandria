import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import transactionService from '../lib/transaction-service';
import bookService from '../lib/book-service';
import { withAuth } from './AuthProvider';

class Story extends Component {

  componentDidMount() {
    const userId = this.props.user._id;

    // transactionService.find(userId);
      // .then()
      // .catch()
  }

  render() {
    return (
      <div>
        hola, soy story
      </div>
    )
  }
}

export default withAuth(Story)
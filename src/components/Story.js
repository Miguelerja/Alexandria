import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import transactionService from '../lib/transaction-service';
import bookService from '../lib/book-service';
import { withAuth } from './AuthProvider';

/* IMPORTANT! I believe the redirect from the popup works
but the component is being mounted behind all the rest, I saw it briefly on load.
zIndex fix is untested. */

class Story extends Component {

  componentDidMount() {
    const userId = this.props.user._id;
    console.log('mounted');
    // transactionService.find(userId);
      // .then()
      // .catch()
  }

  render() {
    const style = {
      zIndex: 1000,
    };
    return (
      <div style={style}>
        hola, soy story
      </div>
    )
  }
}

export default withAuth(Story)
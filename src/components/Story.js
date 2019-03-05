import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import transactionService from '../lib/transaction-service';
import bookService from '../lib/book-service';
import { withAuth } from './AuthProvider';
import StoryMap from './StoryMap';

class Story extends Component {
  state= {
    loaded: false,
  }

  componentDidMount() {
    const userId = this.props.user._id;

    transactionService.find(userId)
      .then()
      .catch()
  }

  render() {
    return (
      <div>
        <StoryMap 
          transactions={this.}
        />
      </div>
    )
  }
}

export default withAuth(Story)
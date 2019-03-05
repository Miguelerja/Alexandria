import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import transactionService from '../lib/transaction-service';
import { withAuth } from './AuthProvider';
import StoryMap from './StoryMap';
import FreeBook from './FreeBook';

class Story extends Component {
  state= {
    loaded: false,
  }

  componentDidMount() {
    const bookId = this.props.match.params.id;
    transactionService.findBook(bookId)
      .then((transactions) => {
        this.setState({
          bookTransactions: transactions,
          loaded: !this.state.loaded,
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const {loaded, bookTransactions} = this.state;
    return (
      <div>
        {(loaded ?        
          <div>
            <FreeBook />
            <StoryMap 
              transactions={bookTransactions}
            />
            <Link to="/">Go back</Link>
          </div>
          :
          <div>loading...</div>
        )}
      </div>
    )
  }
}

export default withAuth(Story)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import transactionService from '../lib/transaction-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { withAuth } from './AuthProvider';
import StoryMap from './StoryMap';
import '../styles/story.css';

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
            <StoryMap 
              transactions={bookTransactions}
            />
            <Link className="story-button" to="/">< FontAwesomeIcon icon={faArrowLeft}/></Link>
          </div>
          :
          <div>loading...</div>
        )}
      </div>
    )
  }
}

export default withAuth(Story)
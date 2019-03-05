import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withAuth } from './AuthProvider';
import '../styles/slidingmenubooks.css';


class SlidingMenuBooks extends Component {
  listTransactionBooks = () => {
    const { transactions } = this.props;
    return transactions.map(transaction => {
      return (
        <Link
          key={transaction.bookId}
          to={`/book/${transaction.bookId}`}
        >
          {transaction.bookTitle}
        </Link>
        )
    })
  }

  render() {
    return (
      <div className="sliding-menu-books">
          {this.listTransactionBooks()}
      </div>
    )
  }
}

export default withAuth(SlidingMenuBooks)
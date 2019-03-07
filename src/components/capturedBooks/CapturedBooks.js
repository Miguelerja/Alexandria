import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import './styles/capturedBooks.css';


class CapturedBooks extends Component {
  listTransactionBooks = () => {
    const { transactions } = this.props;
    return transactions.map(transaction => {
      return (
        <div
          className="list-container"
          key={transaction.bookId}>
          <Link
            className="captured-book-title"
            to={`/book/${transaction.bookId}`}
          >
            {transaction.bookTitle}
          </Link>
        </div>
        )
    })
  }

  render() {
    const { transactions } = this.props;
    return (
      <div className="captured-books-container">
        {(transactions.length > 0) ? 
          this.listTransactionBooks()
        :
        <h2 className="no-books-message">
          You haven't found any book yet. Check the map and go get them!
        </h2>
        }
      </div>
    )
  }
}

export default withAuth(CapturedBooks)
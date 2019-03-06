import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withAuth } from '../AuthProvider';
import './styles/capturedBooks.css';


class CapturedBooks extends Component {
  listTransactionBooks = () => {
    const { transactions } = this.props;
    return transactions.map(transaction => {
      return (
        <li>
          <Link
            className="captured-book-title"
            key={transaction.bookId}
            to={`/book/${transaction.bookId}`}
          >
            {transaction.bookTitle}
          </Link>
        </li>
        )
    })
  }

  render() {
    const { transactions } = this.props;
    return (
      <div className="captured-books-container">
        {(transactions.length > 0) ? 
          <ul className="list">
            {this.listTransactionBooks()}
          </ul>
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
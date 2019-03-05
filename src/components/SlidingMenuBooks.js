import React, { Component } from 'react'
import { withAuth } from './AuthProvider';
import { withBooks } from './BookProvider';
import '../styles/slidingmenubooks.css';


class SlidingMenuBooks extends Component {

  state = {
    books: this.props.books,
    isLoaded: false,
  }

  render() {
    return (
      <div className="sliding-menu-books">
        {this.props.books.map((book, key) => <div key={key}>{book.info.title}</div>)}
      </div>
    )
  }
}

export default withBooks(withAuth(SlidingMenuBooks))
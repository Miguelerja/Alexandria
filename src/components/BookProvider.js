import React, { Component } from 'react'
import bookService from '../lib/book-service'
import { withRouter } from "react-router";

/* HOC that gives book context to routes and components that require it */

export const BookContext = React.createContext(
  // bookStore // default value
);

export const { Provider, Consumer } = BookContext;

export const withBooks = (Comp) => {
  return class WithBooks extends Component {
    render() {
      return (
        <Consumer>
          {(bookStore) => {
            return <Comp 
              books={bookStore.books}
              updateBooks={bookStore.updateBooks}
              {...this.props} />
          }}
        </Consumer>
      )
    }    
  }
}

class BookProvider extends Component {
  state = {
    books: [],
    status: false,
  }

  updateBooks = () => {
    this.statusFlipper();
    bookService.list()
      .then(booksList => {
        const newBooks = booksList;
        this.setState({
          books: newBooks,
          status: true,
        });
    }).catch(error => console.log(error));
  }

  componentDidMount() {
    this.updateBooks()
  }

  statusFlipper = () => {
    this.setState({
      status: false,
    })
  }

  render() {
    const { books, status } = this.state;
    const { children } = this.props;
    switch (status) {
      case false:
        return <div>Loading</div>
      default:
        return (
          <Provider value={
            { books: books,
              updateBooks: this.updateBooks,
            }}>
            {children}
          </Provider>    
        );
    }
  }
}

export default withRouter(BookProvider)
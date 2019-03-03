import React, { Component } from 'react'
import bookService from '../lib/book-service'

const bookStore = [];

export const BookContext = React.createContext(
  // bookStore // default value
  bookStore,
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
              {...this.props} />
          }}
        </Consumer>
      )
    }    
  }
}

export default class BookProvider extends Component {
  state = {
    books: [],
    status: 'loading',
  }

  componentDidMount() {
    bookService.list()
      .then(booksList => {
        this.setState({
          books: booksList,
          status: 'loaded',
        });
    }).catch(error => console.log(error));
  }

  render() {
    const { books, status } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <div>Loading</div>
      default:
        return (
          <Provider value={
            { books: books,
            }}>
            {children}
          </Provider>    
        );
    }
  }
}
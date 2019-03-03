import React, { Component } from 'react'
import bookService from '../lib/book-service'

export const withBooks = (Comp) => {
  return class WithBooks extends Component {

    state = {
      books: [],
      status: 'loading',
    }

    componentDidMount() {
      bookService.list()
        .then(booksList => {
          console.log(booksList)
          this.setState({
            books: booksList,
            status: 'loaded',
          });
      }).catch(error => console.log(error));
    }

    render() {
      
      switch (this.state.status) {
        case 'loading':
          return null
        default:
          return <Comp 
          books={this.state.books}
          {...this.props} />
      }  
    }    
  }
}
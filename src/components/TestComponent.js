import React, { Component } from 'react'

export default class TestComponent extends Component {

  state = {
    books: this.props.books,
  }

  componentDidMount() {
    const idToFind = this.props.node.firstChild.getAttribute('id');
    const {books} = this.props;
    const rightBook = books.find((book) => {
      return book._id === idToFind;
    })
    this.setState({
      book: rightBook,
    })
  }

  render() {
    const {book} = this.state;
    return (
      <h1>
        {(this.state.book !== undefined) ? book.info.title : null }
      </h1>
    )
  }
}

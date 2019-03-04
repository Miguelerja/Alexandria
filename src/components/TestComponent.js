import React, { Component } from 'react'

export default class TestComponent extends Component {

  state = {
    books: this.props.books,
  }

  componentWillMount() {
    const idToFind = this.props.node.firstChild.getAttribute('id');
    const {books} = this.props;
    const rightBook = books.find((book) => {
      return book._id === idToFind;
    })
    this.setState({
      book: rightBook,
    }, () => console.log(this.state))
  }

  render() {
    //console.log(this.props.node.firstChild.getAttribute('id'))
    console.log(this.props)
    const {book} = this.state;
    console.log(book);
    return (
      <h1>
        {(this.state.book !== undefined) ? this.state.book.info.title : null }
      </h1>
    )
  }
}

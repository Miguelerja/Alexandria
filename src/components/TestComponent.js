import React, { Component } from 'react'

export default class TestComponent extends Component {

  componentDidMount() {
    const idToFind = this.props.node.firstChild.getAttribute('id');
    const {books} = this.props;
    this.rightBook = books.find((book) => {
      return book.id == idToFind;
    })
  }

  render() {
    console.log(this.props.node.firstChild.getAttribute('id'))
    console.log(this.props)

    return (
      <h1>
        {this.rightBook.title}
      </h1>
    )
  }
}

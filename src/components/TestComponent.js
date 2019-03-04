import React, { Component } from 'react'

export default class TestComponent extends Component {
  render() {
    console.log(this.props)
    return (
      <h1>
        {this.props.books[0].info.title}
      </h1>
    )
  }
}

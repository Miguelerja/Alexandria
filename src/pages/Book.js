import React, { Component } from 'react'

export default class Book extends Component {
  handleClick = () => {

  };
  
  render() {
    return (
      <div>
        <h1>this.props.title</h1>
        <p>this.props.synopsis</p>
        <button onClick={this.handleClick}>Capture</button>
      </div>
    )
  }
}

import React, { Component } from 'react'

export default class BookCode extends Component {
  render() {
    return (
      <div>
        <div className="code-message">
          <p className="code-instructions">Your book is ready to be set free 
            but remember to write this code on it before
          </p>
          <p className="code">{this.props.code}</p>
        </div>
      </div>
    )
  }
}

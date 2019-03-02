import React, { Component } from 'react'

export default class MenuButton extends Component {
  render() {
    return (
      <button onClick={this.props.handleClick}>
        Menu
      </button>
    )
  }
}

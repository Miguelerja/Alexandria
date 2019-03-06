import React, { Component } from 'react'
import { withAuth } from '../AuthProvider';

class Button extends Component {

  handleClick = (event) => {
    this.props.handleClick(event);
  };

  render() {
    return (
      <input
      className={this.props.className}
      type={this.props.type}
      value={this.props.value}
      onClick={this.handleClick}
    />
    )
  }
}

export default withAuth(Button);

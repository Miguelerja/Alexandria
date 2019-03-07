import React, { Component } from 'react';
import './styles/menuButton.css';

export default class MenuButton extends Component {

  render() {
    return (
      <div className="menu-button" onClick={this.props.handleClick}></div>
    )
  }
}

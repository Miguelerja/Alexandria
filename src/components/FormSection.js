import React, { Component } from 'react'
import { withAuth } from './AuthProvider';

class FormSection extends Component {

  handleInput = (event) => this.props.handleChange(event);

  render() {
    return (
      <input 
      className="create-book-input text-input"
      type="text" 
      name={this.props.title} 
      placeholder={this.props.placeholder} 
      value={this.props.value}
      onChange={this.handleInput}/>
    )
  }
}

export default withAuth(FormSection);

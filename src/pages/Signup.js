import React, { Component } from 'react';
import { withAuth } from '../components/providers/AuthProvider';
import '../styles/auth.css';


class Signup extends Component {

  state = {
    username: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.props.signup({ username, password })
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
        });
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <form className="form signup-form" onSubmit={this.handleFormSubmit}>
        <input type="text" name="username" placeholder="Username" value={username || ''} onChange={this.handleChange} required />
        <input type="password" name="password" placeholder="Password" value={password || ''} onChange={this.handleChange} required />
        <input className="auth-button" type="submit" value="Signup" />
      </form>
    )
  }
}

export default withAuth(Signup);
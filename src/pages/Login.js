import React, { Component } from 'react';
import { withAuth } from '../components/providers/AuthProvider';
import '../styles/auth.css';

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: false
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then(() => {
        this.props.history.push('/private')
      })
      .catch( (error) => {
        this.setState({
          error:true,
        })
      });
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <form className="form login-form" onSubmit={this.handleFormSubmit}>
        <input type="text" name="username" placeholder="Username" value={username || ''} onChange={this.handleChange} required />
        <input type="password" name="password" placeholder="Password" value={password || ''} onChange={this.handleChange} required />
        <input className="auth-button" type="submit" value="Login" />
        {this.state.error && <div className="error-message">Wrong data. Try again</div>}
      </form>
    )
  }
}

export default withAuth(Login);
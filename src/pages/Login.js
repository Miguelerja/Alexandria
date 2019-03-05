import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then(() => {
        this.props.history.push('/private')
      })
      .catch( error => console.log(error))
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="form login-form">
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default withAuth(Login);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import '../styles/signup.css';


class Signup extends Component {

  state = {
    username: "",
    email: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;

    this.props.signup({ username, email, password })
      .then( (user) => {
        this.setState({
            username: "",
            email: "",
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
    const { username, email, password } = this.state;
    return (
      <div>
        <form className="form signup-form" onSubmit={this.handleFormSubmit}>
          {/* Username, e-mail and password input for signup */}
          <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
          <input type="text" name="email" placeholder="E-mail" value={email} onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Signup" />
        </form>
      </div>
    )
  }
}

export default withAuth(Signup);
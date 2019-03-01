import React, { Component } from "react";
import { withAuth } from '../components/AuthProvider';
import { Link } from 'react-router-dom';
import "../styles/popupmenu.css";
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
 
class Menu extends Component {

  state = {
    hasAccount: true,
  }

  handleClickAccount = () => {
    this.setState({
      hasAccount: !this.state.hasAccount,
    })
  }

  render() {

    let visible = "hidden";
    const { isLogged, user, logout } = this.props;
    const { username } = user;
 
    if (this.props.isVisible) {
      visible = "visible";
    }

    if (isLogged) {
      return (
        <div id="slidingMenu" onClick={this.props.handleClick} className={visible}>
          <p>{ username }'s Profile</p>
          <Link to="/history" />
          <p onClick={logout}>Log out</p>
        </div>
      );
    } else {
      return (
        <div id="slidingMenu" onClick={this.props.handleClick} className={visible}>
          {this.state.hasAccount ? (
            <div>
              < Login />
              <button onClick={this.handleClickAccount}>Create an account</button>
            </div>
          ) : (
            <div>
              < SignUp />
              <button onClick={this.handleClickAccount}>Log In</button>
            </div>
          )}
        </div>
      );
    }
  }
}
 
export default withAuth(Menu);
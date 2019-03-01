import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Link } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import '../styles/popupmenu.css';

class PopUpMenu extends Component {

  state = {
    hasAccount: true,
  }

  handleClick = () => {
    this.setState({
      hasAccount: !this.state.hasAccount,
    })
  }

  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;
    if (isLogged) {
      return <div className="popup-menu logged">
        <div id="slide-menu">
          <p>{ username }'s Profile</p>
          <Link to="/history" />
          <p onClick={() => {
            this.props.closeMenu()
            logout()}}>Log out</p>
        </div>
      </div>
    } else {
      return <div className="popup-menu not-logged">
        {this.state.hasAccount ? (
          <div>
            < Login />
            <button onClick={this.handleClick}>Create an account</button>
          </div>
        ) : (
          <div>
            < SignUp />
            <button onClick={this.handleClick}>Log In</button>
          </div>
        )}
      </div>
    }
  }
}

export default withAuth(PopUpMenu)

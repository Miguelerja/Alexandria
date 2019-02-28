import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import { Link } from 'react-router-dom';

class PopUpMenu extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;
    if (isLogged) {
      return <div className="popup-menu logged">
        <p>{ username }'s Profile</p>
        <p onClick={logout}>Log out</p>
      </div>
    } else {
      return <div className="popup-menu not-logged">
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    }
  }
}

export default withAuth(PopUpMenu) 

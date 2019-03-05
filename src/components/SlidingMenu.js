import React, { Component } from "react";
import { withAuth } from '../components/AuthProvider';
import "../styles/slidingmenu.css";
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import SlidingMenuBooks from '../components/SlidingMenuBooks';
 
class Menu extends Component {

  state = {
    hasAccount: true,
  }

  handleClickAccount = (event) => {
    this.setState({
      hasAccount: !this.state.hasAccount,
    })
    event.stopPropagation();
  }

  componentDidMount() {
    this.props.receiveElement(this.dropdownMenu);
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
        <div id="slidingMenu" className={visible} ref={(element) => {this.dropdownMenu = element;}}>
          <p className="sliding-menu-username">{ username }'s Profile</p>
          < SlidingMenuBooks {...this.props} />
          <p className="sliding-menu-logout" onClick={logout}>Log out</p>
        </div>
      );
    } else {
      return (
        <div id="slidingMenu" className={visible} ref={(element) => {this.dropdownMenu = element}}>
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
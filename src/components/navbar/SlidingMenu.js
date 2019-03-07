import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import { withAuth } from '../providers/AuthProvider';
import "./styles/slidingmenu.css";
import Login from '../../pages/Login';
import SignUp from '../../pages/Signup';
import CapturedBooks from '../capturedBooks/CapturedBooks';
import transactionService from '../../lib/transaction-service';

class Menu extends Component {
  state = {
    hasAccount: true,
    isLoading: true,
    transactions: [],
  }

  transactionsHandler = () => {
    const userThatHunts = this.props.user._id;
    transactionService.findUser(userThatHunts)
      .then((transactions) => {
        this.setState({
          transactions: transactions,
        });
      })
      .catch(error => console.log(error));
  }

  handleClickAccount = (event) => {
    this.setState({
      hasAccount: !this.state.hasAccount,
    })
    event.stopPropagation();
  }

  /* Receive reference to create sliding menu */

  componentDidMount() {
    this.props.receiveElement(this.dropdownMenu);
    this.transactionsHandler();
    this.setState({
      isLoading: false,
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
      const { isLoading } = this.state;
      return (
        <div 
          id="slidingMenu" 
          className={visible} 
          ref={(element) => {this.dropdownMenu = element;}}
        >
          <div className="sliding-menu-username"><span>{ username } Profile</span></div>
          {(isLoading) ? <div>Loading</div> :
            <CapturedBooks 
            transactions={this.state.transactions}
            />
          }
          <div className="sliding-menu-logout" onClick={logout}>
            <span><FontAwesomeIcon icon={faSignOutAlt} /></span>
          </div>
        </div>
      );
    } else {
      return (
        <div id="slidingMenu" className={visible} ref={(element) => {this.dropdownMenu = element}}>
          {this.state.hasAccount ? (
            <div>
              < Login />
              <button className="toggle-btn" onClick={this.handleClickAccount}>Create an account</button>
            </div>
          ) : (
            <div>
              < SignUp />
              <button className="toggle-btn" onClick={this.handleClickAccount}>Already have an account? Log In</button>
            </div>
          )}
        </div>
      );
    }
  }
}
 
export default withAuth(Menu);
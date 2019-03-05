import React, { Component } from "react";
import { withAuth } from '../components/AuthProvider';
import "../styles/slidingmenu.css";
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import SlidingMenuBooks from '../components/SlidingMenuBooks';
import transactionService from '../lib/transaction-service';

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
          <p className="sliding-menu-username">{ username }'s Profile</p>
          {(isLoading) ? <div>Loading</div> :
            <SlidingMenuBooks 
            transactions={this.state.transactions}
            />
          }
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
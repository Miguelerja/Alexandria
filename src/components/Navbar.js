import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import PopUpMenu from '../components/PopUpMenu';
import '../styles/navbar.css';
import MenuButton from '../components/MenuButton';
import SlidingMenu from '../components/SlidingMenu';


class Navbar extends Component {

  state = {
    showMenu: false,
  }

  showMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }

  handleClick = (e) => {
    this.showMenu();
 
    e.stopPropagation();
  }

  render() {
    return (
      <div>
        < MenuButton handleClick={this.handleClick} />
        < SlidingMenu handleClick={this.handleClick} isVisible={this.state.showMenu} props={this.props} />
      </div>
    );
  }
}

export default withAuth(Navbar)

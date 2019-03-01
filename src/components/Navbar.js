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

  showMenu = (event) => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    }); 
  }

  closeMenu = (event) => {
    console.log(this.state.element);
    if (!this.state.element.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
    }
  }

  handleClick = (event) => {
    if (this.state.showMenu === false) {
      this.showMenu(event);
    } else {
      this.closeMenu(event);
    }
    event.stopPropagation();
  }

  receiveElement = (element) => {
    this.setState({
      element: element,
    })
  }

  render() {
    return (
      <div className="navbar">
        < MenuButton handleClick={this.handleClick} />
        {
          this.state.showMenu
            ? (
              < SlidingMenu handleClick={this.handleClick} isVisible={this.state.showMenu} receiveElement={this.receiveElement} props={this.props} />
            )
            : (
              < SlidingMenu handleClick={this.handleClick} isVisible={this.state.showMenu} receiveElement={this.receiveElement} props={this.props} />
            )
        }
    
      </div>
    );
  }
}

export default withAuth(Navbar)

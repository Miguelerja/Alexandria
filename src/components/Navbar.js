import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import PopUpMenu from '../components/PopUpMenu';
import '../styles/navbar.css';


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
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
    }
  }

  closeMenuDirty = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }

  render() {
    return (
      <div>
        <button className="popup-menu-button button" onClick={this.showMenu}>
          Menu
        </button>
        {
          this.state.showMenu
            ? (
              <div
                className="popup-menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
              <PopUpMenu closeMenu={this.closeMenuDirty} props={this.props}/>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default withAuth(Navbar)

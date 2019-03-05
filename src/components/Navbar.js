import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import '../styles/navbar.css';
import MenuButton from '../components/MenuButton';
import SlidingMenu from '../components/SlidingMenu';
import LoadingScreen from '../components/LoadingScreen';

class Navbar extends Component {

  state = {
    showMenu: false,
  }

  setCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        coordinates: [position.coords.longitude, position.coords.latitude]
      }) 
    })
  };

  showMenu = (event) => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    }); 
  }

  closeMenu = (event) => {
    if (!this.state.element.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
    }
  }

  handleClick = (event) => {
    this.setCoordinates();

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
              < SlidingMenu handleClick={this.handleClick}
                isVisible={this.state.showMenu}
                receiveElement={this.receiveElement} props={this.props} />
            )
            : (
              < SlidingMenu handleClick={this.handleClick} 
                isVisible={this.state.showMenu}
                receiveElement={this.receiveElement} props={this.props} />
            )
        }
        {
          (this.props.isLogged) ?
            null
          :
            <LoadingScreen />
        }
      </div>
    );
  }
}

export default withAuth(Navbar)

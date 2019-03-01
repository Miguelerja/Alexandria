import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './components/AuthProvider';
import Map from './components/Map';
import addBookButton from './components/addBookButton';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar data='data' />
          < PrivateRoute component={addBookButton} />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/private" component={Private} />
          </Switch>
          <Map />
        </div>
      </AuthProvider>
    )
  }
}

export default App;
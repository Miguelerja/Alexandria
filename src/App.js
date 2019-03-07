import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute';
import AnonRoute from './pages/AnonRoute';
import Navbar from './components/navbar/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './components/providers/AuthProvider';
import Map from './components/map/Map';
import Story from './components/story/Story';
import BookProvider from './components/providers/BookProvider';

class App extends Component {
  render() {

    return (
      <AuthProvider>
          <div className="container">
            <BookProvider>
              <Navbar data='data' />
              <Switch>              
                <PrivateRoute exact path="/book/:id" component={Story} />
                <PrivateRoute path="/" component={Map} />
              </Switch>            
            </BookProvider>
            <Switch>
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/private" component={Private} />
            </Switch>
          </div>
      </AuthProvider>
    )
  }
}

export default App;
import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateBook from './pages/CreateBook';
import AuthProvider from './components/AuthProvider';
import Map from './components/Map';
import Story from './components/Story';
import addBookButton from './components/addBookButton';
import BookProvider from './components/BookProvider';

class App extends Component {
  render() {

    return (
      <AuthProvider>
          <div className="container">
            <Navbar data='data' />
            <PrivateRoute component={addBookButton} />
            <BookProvider>
              <PrivateRoute component={Map} />
              <PrivateRoute exact path="/book/create" component={CreateBook} />
            </BookProvider>
            <Switch>
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/private" component={Private} />
              <PrivateRoute path="/book/:id" component={Story} />
            </Switch>
          </div>
      </AuthProvider>
    )
  }
}

export default App;
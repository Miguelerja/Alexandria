import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Book from './pages/Book';
import CreateBook from './pages/CreateBook';
import AuthProvider from './components/AuthProvider';
import Map from './components/Map';
import addBookButton from './components/addBookButton';
import bookService from './lib/book-service';
require ('dotenv').config();

class App extends Component {
  state={
    books: [],
  }

  componentDidMount(){
    bookService.list()
    .then(booksList => {this.setState({books: booksList});
    }).catch(error => console.log(error));
  }

  render() {
    const { books } = this.state;
    return (
      <AuthProvider>
        <div className="container">
          <Navbar data='data' />
          < PrivateRoute component={addBookButton} />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/private" component={Private} />
            <PrivateRoute path="/book/:id" component={Book} />
            <PrivateRoute exact path="/book/create" component={CreateBook} />
          </Switch>
          {(books.length !== 0) ? <Map
            books={this.state.books}
            token={process.env.REACT_APP_MAPBOX_TOKEN}
          />
          : null}
        </div>
      </AuthProvider>
    )
  }
}

export default App;
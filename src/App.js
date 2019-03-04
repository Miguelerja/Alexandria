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
import bookService from './lib/book-service';
require ('dotenv').config();

class App extends Component {
  state={
    books: [],
  };

  componentDidMount(){
    bookService.list()
    .then(booksList => {this.setState({books: booksList});
    }).catch(error => console.log(error));
  };

  showBook = () => {
    
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
            <PrivateRoute exact path="/book/create" component={CreateBook} />
            <PrivateRoute path="/book/:id" component={Story} />
          </Switch>
          {(books.length !== 0) ? <Map
            books={this.state.books}
            token={process.env.REACT_APP_MAPBOX_TOKEN}
            showBook={this.showBook}
          />
          : null}
        </div>
      </AuthProvider>
    )
  }
}

export default App;
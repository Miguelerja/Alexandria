import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import bookService from '../lib/book-service';

class CreateBook extends Component {

  state={};

  handleBooksListUpdate = (data) => {
  };

  handleFormSubmit = (event) => {
    const { title, author, synopsis, story, clue } = this.state;
    const { coordinates } = this.props;
    const book = {
      info: {
        title: title,
        author: author,
        synopsis: synopsis,
        story: story,
      },
      clue: clue,
      location: {
        type: 'point',
        coordinates: coordinates,
      }
    };
    bookService.create(book)
      .then((book) => {
        console.log(book.response);
        this.setState({
          title: '',
          author: '',
          synopsis: '',
          story: '',
          clue: '',
          coordinates: [],
        });
      })
      .catch(error => console.log(error));
    

    
    event.preventDefault();
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { author, title, synopsis, story, clue } = this.state;
    return (
      <div>
        <input type="text" name="title" placeholder="Book title" value={title} onChange={this.handleChange}/>
        <input type="text" name="author" placeholder="Author" value={author} onChange={this.handleChange}/>
        <input type="text" name="synopsis" placeholder="Synopsis" value={synopsis} onChange={this.handleChange}/>
        <input type="text" name="story" placeholder="Your story" value={story} onChange={this.handleChange}/>
        <input type="text" name="clue" placeholder="Clue" value={clue} onChange={this.handleChange} />
        <input type="submit" value="Create" onClick={this.handleFormSubmit} />
      </div>
    )
  }
}

export default withAuth(CreateBook)

import React from 'react';

export default class NewBookProvider extends Component {
  state = {
    books: [],
    status: 'loading',
  }

  updateBooks = (newBook) => {
    const newState = { books: [...this.state.books].push(newBook)}
    this.setState({
      newState
    })
  }

  componentDidMount() {
    bookService.list()
      .then(booksList => {
        this.setState({
          books: booksList,
          status: 'loaded',
        });
    }).catch(error => console.log(error));
  }

  render() {
    const { books, status } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <div>Loading</div>
      default:
        return (
          <Provider value={
            { books: books,
              updateBooks: this.updateBooks,
            }}>
            {children}
          </Provider>    
        );
    }
  }
}
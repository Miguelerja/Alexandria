import axios from 'axios';

class BookService {
  constructor() {
    this.book = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    })
  }

  create(book) {
    const { info, clue, coordinates } = book;
    return this.book.post('alexandria/book', {info, clue, coordinates})
      .then(({ data }) => data);
  }
  
  list() {
    return this.book.get('/alexandria')
      .then(({ data }) => data);
  }

  edit(book) {
    const { id, strikes } = book;
    return this.book.post(`/alexandria/book/${id}`, {strikes})
      .then(response => response.data)
  }
}

const bookService = new BookService();

export default bookService;
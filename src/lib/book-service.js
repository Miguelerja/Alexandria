import axios from 'axios';

class BookService {
  constructor() {
    this.book = axios.create({
      baseURL: 'http://localhost:5000',
    })
  }

  create(book) {
    const { info, clue, location } = book;
    return this.book.post('http://localhost:5000/alexandria/book', {info, clue, location})
      .then(({ data }) => data);
  }
  
  list() {
    return this.book.get('http://localhost:5000/alexandria')
      .then(({ data }) => data);
  }

  find(criteria) {
    return this.book.get(`http://localhost:5000/alexandria?${criteria}=${criteria}`)
    .then(({ data }) => data);
  }

  setStrikes(book) {
    const { id, strikes } = book;
    return this.book.put(`http://localhost:5000/alexandria/book/${id}`, {strikes})
      .then(response => response.data)
  }

  capture(book) {
    const { id, code } = book;
    return this.book.put(`http://localhost:5000/alexandria/bookCode/${code}`, {id})
      .then(response => response.data)
  }
}

const bookService = new BookService();

export default bookService;
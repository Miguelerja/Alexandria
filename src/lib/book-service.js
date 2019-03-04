import axios from 'axios';

class BookService {
  constructor() {
    this.book = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    })
  }

  create(book) {
    const { info, clue, location } = book;
    return this.book.post('/alexandria/book', {info, clue, location})
      .then(({ data }) => data);
  }
  
  list() {
    return this.book.get('/alexandria')
      .then(({ data }) => data);
  }

  find(criteria) {
    return this.book.get(`/alexandria?${criteria}=${criteria}`)
    .then(({ data }) => data);
  }

  setStrikes(book) {
    const { id, strikes } = book;
    return this.book.put(`/alexandria/book/${id}`, {strikes})
      .then(response => response.data)
  }

  capture(book) {
    const { id, code } = book;
    return this.book.put(`/alexandria/bookCode/${id}`, {code})
      .then(response => response.data)
  }
}

const bookService = new BookService();

export default bookService;
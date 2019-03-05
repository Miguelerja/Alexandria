import axios from 'axios';

class TransactionService {
  constructor() {
    this.transaction = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  create(transaction) {
    const { bookTitle, bookId, userThatFrees, location, story } = transaction;
    return this.transaction.post('/transaction/new', {bookTitle, bookId, userThatFrees, location, story})
      .then(({ data }) => data);
  }
  
  list() {
    return this.transaction.get('transaction/')
      .then(({ data }) => data);
  }
  
  findBook(bookId) {
    return this.transaction.get(`transaction/?bookId=${bookId}`)
      .then(({ data }) => data);
  }

  findUser(userThatHunts) {
    return this.transaction.get(`transaction/?userThatHunts=${userThatHunts}`)
      .then(({ data }) => data);
  }

  update(bookId, userThatHunts){
    return this.transaction.put(`/transaction/${bookId}`, {userThatHunts})
      .then(({ data }) => data);
  }
}

const transactionService = new TransactionService();

export default transactionService;

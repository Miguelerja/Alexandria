import axios from 'axios';

class TransactionService {
  constructor() {
    this.transaction = axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  create(transaction) {
    const { bookId, userThatFrees } = transaction;
    return this.transaction.post('http://localhost:5000/transaction/new', {bookId, userThatFrees})
      .then(({ data }) => data);
  }
  
  list() {
    return this.transaction.get('http://localhost:5000/')
      .then(({ data }) => data);
  }
  find(userId) {
    return this.transaction.get(`http://localhost:5000/?${userId}=${userId}`)
      .then(({ data }) => data);
  }
}

const transactionService = new TransactionService();

export default transactionService;

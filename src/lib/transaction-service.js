import axios from 'axios';

class TransactionService {
  constructor() {
    this.transaction = axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  create(transaction) {
    const { bookId, userThatFrees, location, story } = transaction;
    return this.transaction.post('http://localhost:5000/transaction/new', {bookId, userThatFrees, location, story})
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

  update(bookId, userThatHunts){
    return this.transaction.put(`http://localhost:5000/transaction/${bookId}`, {userThatHunts})
      .then(({ data }) => data);
  }
}

const transactionService = new TransactionService();

export default transactionService;

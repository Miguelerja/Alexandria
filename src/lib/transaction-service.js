import axios from 'axios';

class TransactionService {
  constructor() {
    this.transaction = axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  create(transaction) {
    const { userThatFrees, bookId } = transaction;
    return this.transaction.post('http://localhost:5000/transaction/new', {userThatFrees, bookId})
      .then(({ data }) => data);
  }
  
  list() {
    return this.transaction.get('http://localhost:5000/')
      .then(({ data }) => data);
  }

  edit(transaction) {
    const { id, strikes } = transaction;
    return this.transaction.post(`http://localhost:5000/transaction/transaction/${id}`, {strikes})
      .then(response => response.data)
  }
}

const transactionService = new TransactionService();

export default transactionService;

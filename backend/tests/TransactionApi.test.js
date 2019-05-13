const request = require('supertest');
const server = require('../src/app');
const seedTransactions = require('../src/seed/transactions');

process.env.TEST_SUITE = 'TRANSACTION_API';

describe('Transaction API /transactions', () => {
  test('GET:/transcrations should return array of transactions', async () => {
    const { body: transactions, statusCode } = await request(server).get('/transactions');
    expect(statusCode).toBe(200);
    expect(transactions.length).toBe(seedTransactions.length);
  });

  test('POST: /transactions should return a 201 for successful creation and new record', async () => {
    const newTransaction = seedTransactions[0];
    const { body: result, statusCode } = await request(server)
      .post('/transactions')
      .send(newTransaction);
    expect(statusCode).toBe(201);
    expect(result.customer.firstName).toBe(newTransaction.customer.firstName);
  });
});

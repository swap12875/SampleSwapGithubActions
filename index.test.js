const request = require('supertest');
const app = require('./index');

describe('API Tests', () => {
  test('GET / should return hello message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello from GitHub Actions Demo!');
  });
});

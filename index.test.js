const request = require('supertest');
const app = require('./index');
const fs = require('fs').promises;
const path = require('path');
let server;

describe('Authentication Tests', () => {
  beforeAll(async () => {
    server = app.listen(3000);
    // Ensure empty users file
    await fs.writeFile(path.join(__dirname, 'data', 'users.json'), '[]');
  });

  afterAll(async () => {
    await fs.writeFile(path.join(__dirname, 'data', 'users.json'), '[]');
    await new Promise(resolve => server.close(resolve));
  });

  test('GET / should redirect to login', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/login');
  }, 10000);

  test('Should create new user and login', async () => {
    // Sign up
    const signupResponse = await request(app)
      .post('/signup')
      .type('form')
      .send('username=testuser&email=test@example.com&password=password123');

    expect(signupResponse.status).toBe(302);
    expect(signupResponse.header.location).toBe('/login');

    // Login
    const loginResponse = await request(app)
      .post('/login')
      .type('form')
      .send('username=testuser&password=password123');

    expect(loginResponse.status).toBe(302);
    expect(loginResponse.header.location).toBe('/dashboard');
  }, 10000);
});

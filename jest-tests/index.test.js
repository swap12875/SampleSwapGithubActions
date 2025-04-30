const request = require('supertest');
const app = require('../index');
const fs = require('fs').promises;
const path = require('path');
let server;

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.json');

describe('Authentication Tests', () => {
  beforeAll(async () => {
    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true });
    // Create empty users file
    await fs.writeFile(usersFile, '[]');
    server = app.listen(3000);
  });

  afterAll(async () => {
    // Clean up
    try {
      await fs.writeFile(usersFile, '[]');
    } catch (err) {
      console.error('Error cleaning up:', err);
    }
    await new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  beforeEach(async () => {
    // Reset users file before each test
    await fs.writeFile(usersFile, '[]');
  });

  test('GET / should redirect to login', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/login');
  });

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
  });
});

// Handle process termination
process.on('SIGTERM', () => {
  server?.close();
});

process.on('SIGINT', () => {
  server?.close();
});

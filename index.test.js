const request = require('supertest');
const app = require('./index');
let server;

describe('API Tests', () => {
  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  test('GET / should return hello message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello from GitHub Actions Demo in Dev branch!');
  });
});

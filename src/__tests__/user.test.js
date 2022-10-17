import 'dotenv/config';
import typeorm from 'typeorm';
import request from 'supertest';
import entities from '../models/index.js';
import { app } from '../app.js';

const { createConnection, getConnection } = typeorm;

let userId = null;

describe('user API tests', (done) => {
  beforeAll(async () => {
    await typeorm.createConnection({
      type: process.env.DATABASE_TYPE,
      database: process.env.DATABASE_NAME,
      entities,
      synchronize: true,
    });
  });
  afterAll(async () => {
    await typeorm.getConnection().close();
  });
  test('POST - /register-1', async () => {
    const response = await request(app)
      .post('/register-1')
      .send({
        voornaam: 'Stef',
        familienaam: 'azeaze',
        passwoord: 'azeaze',
        telefoon: 'azeazeaze',
        telefoonPartner: 'azeazeaze',
        email: 'sazetef.azeazeazedb@hotmail.com',
      })
      .expect(302);
  });
  test('GET - /api/users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200)
      .then((res) => {
        userId = res.body[res.body.length - 1].id;
      });
  });
  test(`GET - /api/user/${userId}`, async () => {
    const response = await request(app).get(`/api/user/${userId}`);
    expect(response.statusCode).toBe(200);
  });
  test('PUT - /api/user', async () => {
    const response = await request(app)
      .put('/api/user')
      .send({
        id: userId,
        voornaam: 'Jos',
      })
      .expect(200);
  });
  test(`DELETE - /api/user/${userId}`, async () => {
    const response = await request(app).delete(`/api/user/${userId}`);
    expect(response.statusCode).toBe(200);
  });
});

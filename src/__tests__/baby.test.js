import 'dotenv/config';
import typeorm from 'typeorm';
import request from 'supertest';
import entities from '../models/index.js';
import { app } from '../app.js';

const { createConnection, getConnection } = typeorm;
let babyId = null;

describe('baby API tests', (done) => {
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
  test('POST - /api/baby', async () => {
    const response = await request(app)
      .post('/api/baby')
      .send({
        date: 23403242342,
        gender: 'male',
      })
      .expect(200);
  });
  test('GET - /api/babies', async () => {
    const response = await request(app)
      .get('/api/babies')
      .expect(200)
      .then((res) => {
        babyId = res.body[res.body.length - 1].id;
      });
  });
  test(`GET - /api/baby/${babyId}`, async () => {
    const response = await request(app).get(`/api/baby/${babyId}`);
    expect(response.statusCode).toBe(200);
  });
  test('PUT - /api/baby', async () => {
    const response = await request(app)
      .put('/api/baby')
      .send({
        id: babyId,
        weight: 300,
      })
      .expect(200);
  });
  test(`DELETE - /api/baby/${babyId}`, async () => {
    const response = await request(app).delete(`/api/baby/${babyId}`);
    expect(response.statusCode).toBe(200);
  });
});

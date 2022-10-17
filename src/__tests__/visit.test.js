import 'dotenv/config';
import typeorm from 'typeorm';
import request from 'supertest';
import entities from '../models/index.js';
import { app } from '../app.js';

const { createConnection, getConnection } = typeorm;
let visitId = null;

describe('visit API tests', (done) => {
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
  test('POST - /api/visit', async () => {
    const response = await request(app)
      .post('/api/visit')
      .send({
        date: 23403242342,
        status: 'new',
      })
      .expect(200);
  });
  test('GET - /api/visits', async () => {
    const response = await request(app)
      .get('/api/visits')
      .expect(200)
      .then((res) => {
        visitId = res.body[res.body.length - 1].id;
      });
  });
  test(`GET - /api/visit/${visitId}`, async () => {
    const response = await request(app).get(`/api/visit/${visitId}`);
    expect(response.statusCode).toBe(200);
  });
  test('PUT - /api/visit', async () => {
    const response = await request(app)
      .put('/api/visit')
      .send({
        id: visitId,
        status: 'done',
      })
      .expect(200);
  });
  test(`DELETE - /api/visit/${visitId}`, async () => {
    const response = await request(app).delete(`/api/visit/${visitId}`);
    expect(response.statusCode).toBe(200);
  });
});

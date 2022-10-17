import 'dotenv/config';
import typeorm from 'typeorm';
import request from 'supertest';
import entities from '../models/index.js';
import { app } from '../app.js';

const { createConnection, getConnection } = typeorm;
let contactId = null;

describe('contact API tests', (done) => {
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
  test('POST - /api/contact', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        firstname: 'test123',
        lastname: 'test123',
        phoneNumber: '049321321',
      })
      .expect(200);
  });
  test('GET - /api/contacts', async () => {
    const response = await request(app)
      .get('/api/contacts')
      .expect(200)
      .then((res) => {
        contactId = res.body[res.body.length - 1].id;
      });
  });
  test(`GET - /api/contact/${contactId}`, async () => {
    const response = await request(app).get(`/api/contact/${contactId}`);
    expect(response.statusCode).toBe(200);
  });
  test('PUT - /api/contact', async () => {
    const response = await request(app)
      .put('/api/contact')
      .send({
        id: contactId,
        phoneNumber: '049321123',
      })
      .expect(200);
  });
  test(`DELETE - /api/contact/${contactId}`, async () => {
    const response = await request(app).delete(`/api/contact/${contactId}`);
    expect(response.statusCode).toBe(200);
  });
});

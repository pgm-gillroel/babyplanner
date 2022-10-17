import 'dotenv/config';
import typeorm from 'typeorm';
import request from 'supertest';
import entities from '../models/index.js';
import { app } from '../app.js';

const { createConnection, getConnection } = typeorm;
let groupId = null;

describe('group API tests', (done) => {
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
  test('POST - /api/group', async () => {
    const response = await request(app)
      .post('/api/group')
      .send({
        name: 'test123',
        permissions: 'male',
      })
      .expect(200);
  });
  test('GET - /api/groups', async () => {
    const response = await request(app)
      .get('/api/groups')
      .expect(200)
      .then((res) => {
        groupId = res.body[res.body.length - 1].id;
      });
  });
  test(`GET - /api/group/${groupId}`, async () => {
    const response = await request(app).get(`/api/group/${groupId}`);
    expect(response.statusCode).toBe(200);
  });
  test('PUT - /api/group', async () => {
    const response = await request(app)
      .put('/api/group')
      .send({
        id: groupId,
        name: 'test456',
      })
      .expect(200);
  });
  test(`DELETE - /api/group/${groupId}`, async () => {
    const response = await request(app).delete(`/api/group/${groupId}`);
    expect(response.statusCode).toBe(200);
  });
});

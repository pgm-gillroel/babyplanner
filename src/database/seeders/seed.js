// imports
import { createConnection } from 'typeorm';
import DatabaseSeeder from './databaseSeeder.js';
import entities from '../../models/index.js';
import {
  UserFactory,
  BabyFactory,
  ContactFactory,
  VisitFactory,
  GroupFactory,
} from '../factories/index.js';

const connection = await createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
});

// New instance of db seeder
const dbSeeder = new DatabaseSeeder(connection);

let totalRecords = [];

// seed with the user factory
await dbSeeder.run(UserFactory, 30).then((records) => {
  console.log(`${records.length} users seeded in db`);
  totalRecords = [...totalRecords, ...records];
});

// // seed with the baby factory
await dbSeeder.run(BabyFactory, 30).then((records) => {
  console.log(`${records.length} babies seeded in db`);
  totalRecords = [...totalRecords, ...records];
});

// // seed with the contact factory
await dbSeeder.run(ContactFactory, 300).then((records) => {
  console.log(`${records.length} contacts seeded in db`);
  totalRecords = [...totalRecords, ...records];
});

// // seed with the visit factory
await dbSeeder.run(VisitFactory, 200).then((records) => {
  console.log(`${records.length} visits seeded in db`);
  totalRecords = [...totalRecords, ...records];
});

// seed with the group factory
await dbSeeder.run(GroupFactory, 40).then((records) => {
  console.log(`${records.length} groups seeded in db`);
  totalRecords = [...totalRecords, ...records];
});

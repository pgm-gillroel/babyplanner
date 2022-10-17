// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { getConnection, getRepository } from 'typeorm';
import Factory from './Factory.js';

class VisitFactory extends Factory {
  // make one record
  async make() {
    const statuses = ['Confirmed', 'Not Confirmed', 'Pending'];
    const userRepository = await getConnection().getRepository('User');
    const users = await userRepository.find({
      relations: ['baby', 'contacts'],
      where: { baby: ![], contacts: ![] },
    });
    const randomUser =
      users[faker.datatype.number({ min: 0, max: users.length - 1 })];
    const randomContact =
      randomUser.contacts[
        faker.datatype.number({ min: 0, max: randomUser.contacts.length - 1 })
      ];

    const randomBaby =
      randomUser.baby[
        faker.datatype.number({ min: 0, max: randomUser.baby.length - 1 })
      ];
    const visit = {
      date: faker.datatype.number({
        min: new Date().getTime() + 60000,
        max: new Date().getTime() + 5259487660,
      }),
      status:
        statuses[faker.datatype.number({ min: 0, max: statuses.length - 1 })],
      contacts: [randomContact],
      baby: randomBaby,
    };
    const record = await this.insert(visit);
    this.inserted.push(record);
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(visit) {
    const repo = getConnection().getRepository('Visit');
    // record exists?
    let record = await repo.findOne({
      relations: ['baby'],
      where: [{ date: visit.date }],
    });
    if (record) return record;
    // create record
    record = await repo.save(visit);

    // return
    return record;
  }
}

export default new VisitFactory();

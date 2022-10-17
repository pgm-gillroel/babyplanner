// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { getConnection, getRepository } from 'typeorm';
import Factory from './Factory.js';

class ContactFactory extends Factory {
  // make one record
  async make() {
    const gender = faker.name.gender(true);
    const userRepository = await getConnection().getRepository('User');
    const users = await userRepository.find({ relations: ['userMeta'] });
    const randomUser =
      users[faker.datatype.number({ min: 0, max: users.length - 1 })];
    const contact = {
      firstname: faker.name.firstName(gender),
      lastname: faker.name.lastName(),
      date: new Date().getTime(),
      avatar: faker.image.avatar(),
      phoneNumber: faker.phone.phoneNumber('+04#########'),
      user: randomUser,
    };
    const record = await this.insert(contact);
    this.inserted.push(record);
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(contact) {
    const repo = getConnection().getRepository('Contact');

    // record exists?
    let record = await repo.findOne({
      relations: ['user'],
      where: [{ user: contact.user } && { firstname: contact.firstname }],
    });
    if (record) {
      return record;
    }
    // create record
    record = await repo.save(contact);

    // return
    return record;
  }
}

export default new ContactFactory();

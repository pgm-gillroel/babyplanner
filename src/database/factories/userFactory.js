import typeorm from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import Factory from './Factory.js';

const { getConnection } = typeorm;

class UserFactory extends Factory {
  // make one record
  async make() {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const phoneNumber = faker.phone.phoneNumber('+04#########');
    const password = 'Testing123';

    // hash te password
    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = {
      email: faker.internet.email(firstname, lastname),
      password: hashedPassword,
      userMeta: {
        firstname,
        lastname,
        phoneNumber,
        phoneNumberPartner: phoneNumber,
      },
    };

    const record = await this.insert(user);
    this.inserted.push(record);
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(user) {
    const repo = getConnection().getRepository('User');

    // record exists?
    let record = await repo.findOne({
      where: [{ email: user.email }, { userName: user.userName }],
    });
    if (record) return record;
    // create record
    record = await repo.save(user);

    // return
    return record;
  }
}

export default new UserFactory();

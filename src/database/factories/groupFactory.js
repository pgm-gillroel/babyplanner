// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { getConnection, getRepository } from 'typeorm';
import Factory from './Factory.js';

class GroupFactory extends Factory {
  // make one record
  async make() {
    const userRepository = await getConnection().getRepository('User');
    const users = await userRepository.find({ relations: ['userMeta'] });
    const randomUser =
      users[faker.datatype.number({ min: 0, max: users.length - 1 })];
    const permissionNames = ['photo', 'agenda', 'visits', 'requests'];
    const permissions = permissionNames.map((e) => {
      e += `_${faker.datatype.boolean().toString()}`;
      return e;
    });
    const name = faker.name.jobArea();
    const group = {
      name,
      permissions,
      user: randomUser,
    };
    const record = await this.insert(group);
    this.inserted.push(record);
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(group) {
    const repo = getConnection().getRepository('Group');

    // record exists?
    let record = await repo.findOne({
      relations: ['user'],
      where: [{ user: group.user }, { name: group.name }],
    });
    if (record) return record;
    // create record
    record = await repo.save(group);

    // return
    return record;
  }
}

export default new GroupFactory();

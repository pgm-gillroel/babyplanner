// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { getConnection, getRepository } from 'typeorm';
import Factory from './Factory.js';

class BabyFactory extends Factory {
  // make one record
  async make() {
    const gender = faker.name.gender(true);
    const photos = [];
    const userRepository = await getConnection().getRepository('User');
    const users = await userRepository.find({
      relations: ['userMeta', 'baby'],
    });
    const babyLessUsers = users.filter((u) => u.baby.length === 0);
    const randomUser =
      babyLessUsers[
        faker.datatype.number({ min: 0, max: babyLessUsers.length - 1 })
      ];
    for (let i = 0; i < faker.datatype.number({ min: 0, max: 5 }); i += 1) {
      photos.push(faker.image.people());
    }
    const baby = {
      firstname: faker.name.firstName(gender),
      lastname: randomUser.userMeta.lastname,
      date: new Date().getTime(),
      weight: faker.datatype.number({ min: 2000, max: 3500 }),
      length: faker.datatype.number({ min: 40, max: 60 }),
      photos,
      gender,
      user: randomUser,
    };
    const record = await this.insert(baby);
    this.inserted.push(record);
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(baby) {
    const repo = getConnection().getRepository('Baby');

    // record exists?
    let record = await repo.findOne({
      relations: ['user'],
      where: [{ user: baby.user }, { firstname: baby.firstname }],
    });
    if (record) return record;
    // create record
    record = await repo.save(baby);

    // return
    return record;
  }
}

export default new BabyFactory();

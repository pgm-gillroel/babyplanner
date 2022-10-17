/* eslint-disable radix */
import { faker } from '@faker-js/faker';
import { getConnection } from 'typeorm';

const contactSeeder = async (req, res, next) => {
  const userRepository = await getConnection().getRepository('User');
  const contactRepository = await getConnection().getRepository('Contact');
  const user = await userRepository.findOne({
    where: { id: req.body.userId },
    relations: ['contacts', 'baby'],
  });
  const contacts = [];
  for (let i = 0; i < faker.datatype.number({ min: 15, max: 25 }); i += 1) {
    const contact = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      date: new Date().getTime(),
      avatar: faker.image.avatar(),
      phoneNumber: faker.phone.phoneNumber('+04#########'),
      user,
    };
    contacts.push(contact);
  }
  contacts.forEach(async (contact) => {
    await contactRepository.save(contact);
  });
  next();
};

export default contactSeeder;

/* eslint-disable radix */
import { faker } from '@faker-js/faker';
import { getConnection } from 'typeorm';

const visitorSeeder = async (req, res, next) => {
  const statuses = ['Confirmed', 'Not Confirmed', 'Pending'];
  const userRepository = await getConnection().getRepository('User');
  const contactRepository = await getConnection().getRepository('Contact');
  const visitRepository = await getConnection().getRepository('Visit');
  const user = await userRepository.findOne({
    where: { id: req.body.userId },
    relations: ['contacts', 'baby'],
  });
  const contacts = await contactRepository.find({
    where: { user },
    relations: ['user'],
  });
  const visits = [];
  for (let i = 0; i < 2; i += 1) {
    const randomContact =
      contacts[faker.datatype.number({ min: 0, max: contacts.length - 1 })];
    const visit = {
      date: faker.datatype.number({
        min: new Date().getTime() + 60000,
        max: new Date().getTime() + 2629743830,
      }),
      status: 'Not Confirmed',
      contacts: [
        {
          id: randomContact.id,
          firstname: randomContact.firstname,
          lastname: randomContact.lastname,
          avatar: randomContact.avatar,
          phoneNumber: randomContact.phoneNumber,
        },
      ],
      baby: user.baby[0],
    };
    visits.push(visit);
  }
  for (let i = 0; i < faker.datatype.number({ min: 10, max: 16 }); i += 1) {
    const randomContact =
      contacts[faker.datatype.number({ min: 0, max: contacts.length - 1 })];
    const visit = {
      date: faker.datatype.number({
        min: new Date().getTime() + 60000,
        max: new Date().getTime() + 2629743830,
      }),
      status:
        statuses[faker.datatype.number({ min: 0, max: statuses.length - 1 })],
      contacts: [
        {
          id: randomContact.id,
          firstname: randomContact.firstname,
          lastname: randomContact.lastname,
          avatar: randomContact.avatar,
          phoneNumber: randomContact.phoneNumber,
        },
      ],
      baby: user.baby[0],
    };
    visits.push(visit);
  }
  visits.forEach(async (visit) => {
    await visitRepository.save(visit);
  });
  next();
};

export default visitorSeeder;

import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

export const account = async (req, res) => {
  const { token } = req.cookies;
  const user = jwt.verify(token, process.env.TOKEN_SALT);
  req.user = user;

  const userRepository = getConnection().getRepository('User');
  const data = await userRepository.findOne({
    where: { id: req.user.userId },
    relations: ['userMeta', 'baby'],
  });

  const userData = {
    ...data,
  };

  if (data.baby[0].firstname === 'undefined') {
    userData.firstname = 'Voornaam';
  } else {
    userData.firstname = data.baby[0].firstname;
  }

  if (data.baby[0].lastname === 'undefined') {
    userData.lastname = 'Familienaam';
  } else {
    userData.lastname = data.baby[0].lastname;
  }

  if (data.baby[0].weight === 'undefined') {
    userData.weight = 'Gewicht';
  } else {
    userData.weight = `${data.baby[0].weight}gram`;
  }

  if (data.baby[0].length === 'undefined') {
    userData.length = 'Lengte';
  } else {
    userData.weight = `${data.baby[0].length}cm`;
  }

  res.render('account', {
    userData,
  });
};

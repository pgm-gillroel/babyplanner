import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';

export const Home = async (req, res) => {
  const { token } = req.cookies;
  const user = jwt.verify(token, process.env.TOKEN_SALT);
  req.user = user;
  const userRepository = getConnection().getRepository('User');
  const userData = await userRepository.findOne({
    where: { id: req.user.userId },
    relations: ['baby'],
  });

  const { date } = userData.baby[0];
  const dates = new Date(date);
  const day = `${dates.getDate()}/${dates.getMonth()}`;
  const hour = `${dates.getHours()}:${dates.getMinutes()}`;

  const data = {
    ...userData,
    hour,
    day,
  };

  if (data.baby[0].firstname === 'undefined') {
    data.firstname = 'Alice';
  } else {
    data.firstname = data.baby[0].firstname;
  }

  if (data.baby[0].lastname === 'undefined') {
    data.lastname = 'Corbiaux';
  } else {
    data.lastname = data.baby[0].lastname;
  }

  if (data.baby[0].weight === 'undefined') {
    data.weight = '3540kg';
  } else {
    data.weight = `${data.baby[0].weight}gram`;
  }

  if (data.baby[0].length === 'undefined') {
    data.length = '43cm';
  } else {
    data.weight = `${data.baby[0].length}cm`;
  }

  console.log(data);

  res.render('home', { data });
};

/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';

export const jwtAuth = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    // JWT payload data
    const userPayload = jwt.verify(token, process.env.TOKEN_SALT);

    const userRepository = getConnection().getRepository('User');
    const user = await userRepository.findOne({
      relations: ['userMeta', 'baby', 'groups', 'contacts'],
      where: { id: userPayload.userId },
    });

    req.user = user;

    next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/start');
  }
};

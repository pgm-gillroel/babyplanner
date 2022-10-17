import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

export const validateBaby = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const user = jwt.verify(token, process.env.TOKEN_SALT);
    req.user = user;
    const userRepository = getConnection().getRepository('User');
    const userData = await userRepository.findOne({
      where: { id: req.user.userId },
      relations: ['baby'],
    });

    if (userData.baby.length === 0) {
      res.redirect('/register-2');
    } else {
      next();
    }
  } catch (e) {
    next();
  }
};

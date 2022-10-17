import { validationResult } from 'express-validator';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

export const secondRegister = async (req, res) => {
  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = {
    title: 'Bijna klaar',
    forms: [
      {
        name: 'datum',
        label: 'Wanneer ben je uitgerekend?*',
        type: 'text',
        placeholder: 'DD/MM/YYYY',
        value: req.body?.datum ? req.body.datum : '',
        error: req.formErrorsFields?.datum ? req.formErrorsFields.datum : '',
      },
    ],
  };

  res.render('register-2', {
    inputs,
    formErrors,
  });
};

export const postRegister2 = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.formErrorsFields = {};

      errors.array().forEach(({ msg, param }) => {
        req.formErrorsFields[param] = msg;
      });
      return next();
    }

    const { token } = req.cookies;
    const user = jwt.verify(token, process.env.TOKEN_SALT);
    req.user = user;
    const userRepository = getConnection().getRepository('User');
    const userData = await userRepository.findOne({
      where: { id: req.user.userId },
    });

    const babyRepository = getConnection().getRepository('Baby');


    const dateBody = req.body.datum;
    const [day, month, year] = dateBody.split('/');

    const result = [month, day, year].join('/');

    const date = new Date(result);
    const milliseconds = date.getTime();

    // save the data in databank
    await babyRepository.save({
      gender: req.body.gender,
      date: milliseconds,
      user: {
        id: userData.id,
      },
    });

    // go to register page 2
    res.redirect('/validate-account');
    // next();
  } catch (e) {
    return next(e.message);
  }
};

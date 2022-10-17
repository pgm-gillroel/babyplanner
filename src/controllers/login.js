import { validationResult } from 'express-validator';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  if (req.cookies.token) {
    res.redirect('/');
    return;
  }

  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = {
    title: 'Inloggen',
    forms: [
      {
        name: 'email',
        label: 'E-mail*',
        type: 'email',
        placeholder: 'nicky@babyzen.be',
        value: req.body?.email ? req.body.email : '',
        error: req.formErrorsFields?.email ? req.formErrorsFields.email : '',
      },
      {
        name: 'passwoord',
        label: 'Geef een paswoord in*',
        type: 'password',
        placeholder: 'paswoord',
        value: req.body?.passwoord ? req.body.passwoord : '',
        error: req.formErrorsFields?.passwoord
          ? req.formErrorsFields.passwoord
          : '',
      },
    ],
    button: {
      label: 'Log In',
      href: '/',
    },
    troubleshooting: {
      label: 'Ik heb nog geen account, registreer!',
      href: '/register-1',
    },
  };

  res.render('login', {
    inputs,
    formErrors,
  });
};

export const postLogin = async (req, res, next) => {
  try {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   req.formErrorsFields = {};

    //   errors.array().forEach(({ msg, param }) => {
    //     req.formErrorsFields[param] = msg;
    //   });
    //   return next();
    // }
    const userRepository = getConnection().getRepository('User');

    const user = await userRepository.findOne({
      where: { email: req.body.email },
      relations: ['baby'],
    });

    if (!user) {
      req.formErrors = [{ message: 'Gebruiker is onbekend.' }];
      return next();
    }

    // check if incoming password is equal with the one in our database
    const isEqual = bcrypt.compareSync(req.body.passwoord, user.password);

    if (!isEqual) {
      req.formErrors = [{ message: 'Wachtwoord is onjuist' }];
      return next();
    }

    // create a token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.TOKEN_SALT,
      { expiresIn: '1h' }
    );

    // add the cookie in response
    res.cookie('token', token, { httpOnly: true });

    // redirect to the home page
    if (user.baby.length === 0) {
      res.redirect('/register-2');
    } else {
      res.redirect('/');
    }
  } catch (e) {
    return next(e.message);
  }
};

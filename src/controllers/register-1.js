import { validationResult } from 'express-validator';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const firstRegister = (req, res) => {
  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = {
    title: 'Maak een account aan',
    forms: [
      {
        name: 'voornaam',
        label: 'Wat is jouw voornaam?*',
        type: 'text',
        placeholder: 'Jessica',
        value: req.body?.voornaam ? req.body.voornaam : '',
        error: req.formErrorsFields?.voornaam
          ? req.formErrorsFields.voornaam
          : '',
      },
      {
        name: 'familienaam',
        label: 'Wat is jouw familienaam?*',
        type: 'text',
        placeholder: 'Timmermans',
        value: req.body?.familienaam ? req.body.familienaam : '',
        error: req.formErrorsFields?.familienaam
          ? req.formErrorsFields.familienaam
          : '',
      },
      {
        name: 'passwoord',
        label: 'Geef een paswoord in*',
        type: 'password',
        placeholder: '*********',
        value: req.body?.passwoord ? req.body.passwoord : '',
        error: req.formErrorsFields?.passwoord
          ? req.formErrorsFields.passwoord
          : '',
      },
      {
        name: 'telefoon',
        label: 'GSM-nummer*',
        type: 'text',
        placeholder: '0496247111',
        value: req.body?.telefoon ? req.body.telefoon : '',
        error: req.formErrorsFields?.telefoon
          ? req.formErrorsFields.telefoon
          : '',
      },
      {
        name: 'telefoonPartner',
        label: 'GSM-nummer partner (optioneel)',
        type: 'text',
        placeholder: '0496247123',
        value: req.body?.telefoonPartner ? req.body.telefoonPartner : '',
        error: req.formErrorsFields?.telefoonPartner
          ? req.formErrorsFields.telefoonPartner
          : '',
      },
      {
        name: 'email',
        label: 'E-mail*',
        type: 'email',
        placeholder: 'jessicatimmermans@outlook.com',
        value: req.body?.email ? req.body.email : '',
        error: req.formErrorsFields?.email ? req.formErrorsFields.email : '',
      },
    ],
  };
  res.render('register-1', {
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      req.formErrorsFields = {};

      errors.array().forEach(({ msg, param }) => {
        req.formErrorsFields[param] = msg;
      });
      return next();
    }
    const userRepository = getConnection().getRepository('User');

    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      req.formErrors = [{ message: 'Gebruiker bestaat reeds.' }];
      return next();
    }


    // hash te password
    const hashedPassword = bcrypt.hashSync(req.body.passwoord, 12);

    // save the data in databank
    const newUser = await userRepository.save({
      email: req.body.email,
      password: hashedPassword,
      userMeta: {
        firstname: req.body.voornaam,
        lastname: req.body.familienaam,
        phoneNumber: req.body.telefoon,
        phoneNumberPartner: req.body.telefoonPartner,
      },
    });

    // create a token
    const token = jwt.sign(
      { userId: newUser.id, email: req.body.email },
      process.env.TOKEN_SALT,
      { expiresIn: '1h' }
    );

    // add the cookie in response
    res.cookie('token', token, { httpOnly: true });

    // go to register page 2
    res.redirect('/register-2');
    // next();
  } catch (e) {
    return next(e.message);
  }
};

import { body } from 'express-validator';

export default [
  body('voornaam').notEmpty().withMessage('Voornaam is een verplicht veld'),
  body('familienaam')
    .notEmpty()
    .withMessage('Familienaam is een verplicht veld'),
  body('telefoon').notEmpty().withMessage('GSM-nummer is een verplicht veld'),
  body('email')
    .notEmpty()
    .withMessage('E-mail is een verplicht veld')
    .bail()
    .isEmail()
    .withMessage('E-mail is niet juist'),
  body('passwoord')
    .isLength({ min: 6 })
    .withMessage('Wachtwoord moet minstens 6 karakters lang zijn.'),
];

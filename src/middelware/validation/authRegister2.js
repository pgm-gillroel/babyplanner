import { body } from 'express-validator';

export default [
  body('datum')
    .notEmpty()
    .withMessage('datum is een verplicht veld')
    .contains('/')
    .withMessage('datum moet / bevatten')
    .isDate({ format: 'DD-MM-YYYY' })
    .withMessage('datum moet DD/MM/YYYY zijn.'),
];

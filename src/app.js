import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { create } from 'express-handlebars';
import bodyParser from 'body-parser';
import typeorm from 'typeorm';
import swaggerUiExpress from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { SOURCE_PATH } from './consts.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import swaggerDefinition from './docs/swagger.js';
import { firstRegister, postRegister } from './controllers/register-1.js';
import { login, postLogin } from './controllers/login.js';
import { postRegister2, secondRegister } from './controllers/register-2.js';
import { importContacts } from './controllers/import-contacts.js';
import { groupName, postGroupName } from './controllers/group-name.js';
import entities from './models/index.js';
import {
  getModule,
  getSingleModule,
  postModule,
  deleteModule,
  updateModule,
} from './controllers/api/object.js';
import { start } from './controllers/start.js';
import { authentication1 } from './controllers/authentication.js';
import authentication from './middelware/validation/authentication.js';
import {
  PostSelectContacts,
  selectContacts,
} from './controllers/selectContacts.js';
import authRegister2 from './middelware/validation/authRegister2.js';
import { validateImport } from './controllers/validateImport.js';
import { validateAccount } from './controllers/validateAccount.js';
import { validateGroup } from './controllers/validateGroup.js';
import { Home } from './controllers/home.js';
import { agenda } from './controllers/agenda.js';
import { jwtAuth } from './middelware/jwtAuth.js';
import { account } from './controllers/account.js';
import { groupSettings } from './controllers/groupSettings.js';
import { familySettings } from './controllers/familySettings.js';
import { logout } from './controllers/logout.js';
import { validateBaby } from './middelware/validate-baby.js';
import contactSeeder from './controllers/api/seed.import-contacts.js';
import visitorSeeder from './controllers/api/seed.visitors.js';

const { createConnection } = typeorm;

export const app = express();

app.use(express.static('public'));

app.use(
  '/api-docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDefinition)
);

// import cookieparser
app.use(cookieParser());

// handlebars Init
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App Routing
app.get('/start', start);
app.get('/authentication', authentication1);
app.get('/login', login);
app.post('/login', ...authentication, postLogin, login);
app.get('/register-1', firstRegister);
app.post('/register-1', ...authentication, postRegister, firstRegister);
app.get('/register-2', secondRegister);
app.post('/register-2', ...authRegister2, postRegister2, secondRegister);
app.post('/logout', logout);

app.get('/validate-account', jwtAuth, validateBaby, validateAccount);
app.get('/import-contacts', jwtAuth, validateBaby, importContacts);
app.get('/group-settings', jwtAuth, validateBaby, groupSettings);
app.get('/validate-import', jwtAuth, validateImport);
app.get('/group-name', jwtAuth, validateBaby, groupName);
app.post('/group-name', jwtAuth, postGroupName, groupName);
app.get('/family-settings', jwtAuth, validateBaby, familySettings);
app.get('/select-contacts', jwtAuth, validateBaby, selectContacts);
app.post('/select-contacts', jwtAuth, PostSelectContacts, selectContacts);
app.get('/validate-group', jwtAuth, validateBaby, validateGroup);
app.get('/', jwtAuth, validateBaby, Home);
app.get('/agenda', jwtAuth, validateBaby, agenda);
app.get('/account', account);

// user routes
app.get('/api/users', (req, res, next) => getModule('User', req, res, next));
app.get('/api/user/:id', (req, res, next) =>
  getSingleModule('User', req, res, next)
);
app.delete('/api/user/:id', (req, res, next) =>
  deleteModule('User', req, res, next)
);
app.put('/api/user', (req, res, next) => updateModule('User', req, res, next));
app.put('/api/seedContacts', contactSeeder, visitorSeeder);

// baby route
app.get('/api/babies', (req, res, next) => getModule('Baby', req, res, next));
app.get('/api/baby/:id', (req, res, next) =>
  getSingleModule('Baby', req, res, next)
);
app.post('/api/baby', (req, res, next) => postModule('Baby', req, res, next));
app.delete('/api/baby/:id', (req, res, next) =>
  deleteModule('Baby', req, res, next)
);
app.put('/api/baby', (req, res, next) => updateModule('Baby', req, res, next));

// visit route
app.get('/api/visits', (req, res, next) => getModule('Visit', req, res, next));
app.get('/api/visit/:id', (req, res, next) =>
  getSingleModule('Visit', req, res, next)
);
app.post('/api/visit', (req, res, next) => postModule('Visit', req, res, next));
app.delete('/api/visit/:id', (req, res, next) =>
  deleteModule('Visit', req, res, next)
);
app.put('/api/visit', (req, res, next) =>
  updateModule('Visit', req, res, next)
);

// group route
app.get('/api/groups', (req, res, next) => getModule('Group', req, res, next));
app.get('/api/group/:id', (req, res, next) =>
  getSingleModule('Group', req, res, next)
);
app.post('/api/group', (req, res, next) => postModule('Group', req, res, next));
app.delete('/api/group/:id', (req, res, next) =>
  deleteModule('Group', req, res, next)
);
app.put('/api/group', (req, res, next) =>
  updateModule('Group', req, res, next)
);

// contact route
app.get('/api/contacts', (req, res, next) =>
  getModule('Contact', req, res, next)
);
app.get('/api/contact/:id', (req, res, next) =>
  getSingleModule('Contact', req, res, next)
);
app.post('/api/contact', (req, res, next) =>
  postModule('Contact', req, res, next)
);
app.delete('/api/contact/:id', (req, res, next) =>
  deleteModule('Contact', req, res, next)
);
app.put('/api/contact', (req, res, next) =>
  updateModule('Contact', req, res, next)
);

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Application is running on http://localhost:${process.env.PORT}/.`
    );
  });
});

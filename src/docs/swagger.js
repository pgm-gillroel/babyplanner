import schemas from './schemas.js';
import paths from './paths/index.js';

export default {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'An awesome API to control our data',
    description: 'An awesome API to control our data created by students',
    license: {
      name: 'Arteveldehogeschool',
      url: 'https://arteveldehogeschool.be',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Users',
      description: 'All the create, read, update and delete routes',
    },
    {
      name: 'Baby',
      description: 'All the create, read, update and delete routes',
    },
    {
      name: 'Group',
      description: 'All the create, read, update and delete routes',
    },
    {
      name: 'Contact',
      description: 'All the create, read, update and delete routes',
    },
    {
      name: 'Visit',
      description: 'All the create, read, update and delete routes',
    },
  ],
  paths: {
    ...paths,
  },
  components: {
    schemas,
  },
};

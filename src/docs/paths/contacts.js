import contactResponse from '../responses/contact.js';

export default {
  '/api/contact/{id}': {
    get: {
      summary: 'Gets an existing contact',
      description: 'Gets an existing contact in database...',
      tags: ['Contact'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The contact id',
        },
      ],
      responses: contactResponse,
    },
    delete: {
      tags: ['Contact'],
      parameters: [
        {
          in: 'path',
          name: ' id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The contact id',
        },
      ],
      responses: contactResponse,
    },
  },
  '/api/contact': {
    summary: 'Creates a new contact',
    description: 'Creates a new contact...',
    post: {
      tags: ['Contact'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/contactInput',
            },
          },
        },
      },
    },
    put: {
      tags: ['Contact'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ContactInput',
            },
          },
        },
      },
      responses: contactResponse,
    },
  },

  '/api/contacts': {
    summary: 'Gets all the contacts',
    description: 'gets all the contacts in database...',
    get: {
      tags: ['Contact'],
      responses: contactResponse,
    },
  },
};

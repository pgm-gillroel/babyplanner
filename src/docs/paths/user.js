import userResponse from '../responses/user.js';

export default {
  '/api/user/{id}': {
    get: {
      summary: 'Gets a existing user',
      description: 'Gets an existing users in database...',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The user id',
        },
      ],
      responses: userResponse,
    },
    delete: {
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: ' id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The user id',
        },
      ],
      responses: userResponse,
    },
  },
  '/api/users': {
    summary: 'Gets all the users',
    description: 'gets all the users in database...',
    get: {
      tags: ['Users'],
      responses: userResponse,
    },
  },

  '/api/user': {
    summary: 'Creates a new user',
    description: 'Creates a new user...',
    post: {
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserInput',
            },
          },
        },
      },
    },
    put: {
      tags: ['Users'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserInput',
            },
          },
        },
      },
      responses: userResponse,
    },
  },
};

import groupResponse from '../responses/group.js';

export default {
  '/api/group/{id}': {
    get: {
      summary: 'Gets an existing group',
      description: 'Gets an existing group in database...',
      tags: ['Group'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The group id',
        },
      ],
      responses: groupResponse,
    },
    delete: {
      tags: ['Group'],
      parameters: [
        {
          in: 'path',
          name: ' id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The group id',
        },
      ],
      responses: groupResponse,
    },
  },
  '/api/group': {
    summary: 'Creates a new group',
    description: 'Creates a new group...',
    post: {
      tags: ['Group'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GroupInput',
            },
          },
        },
      },
    },
    put: {
      tags: ['Group'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GroupInput',
            },
          },
        },
      },
      responses: groupResponse,
    },
  },

  '/api/groups': {
    summary: 'Gets all the groups',
    description: 'gets all the groups in database...',
    get: {
      tags: ['Group'],
      responses: groupResponse,
    },
  },
};

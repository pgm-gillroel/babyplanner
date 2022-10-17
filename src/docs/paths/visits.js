import visitResponse from '../responses/visit.js';

export default {
  '/api/visit/{id}': {
    get: {
      summary: 'Gets an existing visit',
      description: 'Gets an existing visit in database...',
      tags: ['Visit'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The visit id',
        },
      ],
      responses: visitResponse,
    },
    delete: {
      tags: ['Visit'],
      parameters: [
        {
          in: 'path',
          name: ' id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The visit id',
        },
      ],
      responses: visitResponse,
    },
  },
  '/api/visit': {
    summary: 'Creates a new visit',
    description: 'Creates a new visit...',
    post: {
      tags: ['Visit'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/VisitInput',
            },
          },
        },
      },
    },
    put: {
      tags: ['Visit'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/VisitInput',
            },
          },
        },
      },
      responses: visitResponse,
    },
  },

  '/api/visits': {
    summary: 'Gets all the visits',
    description: 'gets all the visits in database...',
    get: {
      tags: ['Visit'],
      responses: visitResponse,
    },
  },
};

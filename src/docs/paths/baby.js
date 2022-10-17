import babyResponse from '../responses/baby.js';

export default {
  '/api/baby/{id}': {
    get: {
      summary: 'Gets an existing baby',
      description: 'Gets an existing baby in database...',
      tags: ['Baby'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The baby id',
        },
      ],
      responses: babyResponse,
    },
    delete: {
      tags: ['Baby'],
      parameters: [
        {
          in: 'path',
          name: ' id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The baby id',
        },
      ],
      responses: babyResponse,
    },
  },
  '/api/baby': {
    summary: 'Creates a new baby',
    description: 'Creates a new baby...',
    post: {
      tags: ['Baby'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BabyInput',
            },
          },
        },
      },
    },
    put: {
      tags: ['Baby'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BabyInput',
            },
          },
        },
      },
      responses: babyResponse,
    },
  },

  '/api/babies': {
    summary: 'Gets all the babies',
    description: 'gets all the babies in database...',
    get: {
      tags: ['Baby'],
      responses: babyResponse,
    },
  },
};

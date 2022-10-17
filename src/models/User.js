import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
  relations: {
    userMeta: {
      target: 'UserMeta',
      type: 'one-to-one',
      cascade: true,
      joinColumn: true,
    },
    baby: {
      target: 'Baby',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'user',
    },
    groups: {
      target: 'Group',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'user',
    },
    contacts: {
      target: 'Contact',
      type: 'one-to-many',
      inverseSide: 'user',
    },
  },
});

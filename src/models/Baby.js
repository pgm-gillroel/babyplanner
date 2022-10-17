import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Baby',
  tableName: 'babies',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstname: {
      type: 'varchar',
      default: 'undefined',
    },
    lastname: {
      type: 'varchar',
      default: 'undefined',
    },
    date: {
      type: 'int',
    },
    weight: {
      type: 'int',
      default: 'undefined',
    },
    length: {
      type: 'int',
      default: 'undefined',
    },
    photos: {
      type: 'varchar',
      array: true,
      default: 'undefined',
    },
    gender: {
      type: 'varchar',
    },
  },
  relations: {
    visits: {
      target: 'Visit',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'baby',
    },
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});

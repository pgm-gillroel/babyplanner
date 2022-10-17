import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Visit',
  tableName: 'visits',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    date: {
      type: 'int',
    },
    status: {
      type: 'varchar',
    },
  },
  relations: {
    baby: {
      target: 'Baby',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    contacts: {
      target: 'Contact',
      type: 'many-to-many',
      cascade: true,
      joinTable: { name: 'Visits_Contacts' },
    },
  },
});

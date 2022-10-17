import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Contact',
  tableName: 'contacts',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstname: {
      type: 'varchar',
    },
    lastname: {
      type: 'varchar',
    },
    avatar: {
      type: 'varchar',
      default: '/img/avatar.jpg',
    },
    phoneNumber: {
      type: 'varchar',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
    groups: {
      target: 'Group',
      type: 'many-to-many',
      joinTable: { name: 'Groups_Contacts' },
    },
    visits: {
      target: 'Visit',
      type: 'many-to-many',
      joinTable: { name: 'Visits_Contacts' },
    },
  },
});

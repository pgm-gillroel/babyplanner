import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Group',
  tableName: 'groups',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      default: 'undefined',
    },
    permissions: {
      type: 'varchar',
      default: 'undefined',
    },
  },
  relations: {
    contacts: {
      target: 'Contact',
      type: 'many-to-many',
      cascade: true,
      joinTable: { name: 'Groups_Contacts' },
    },
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});

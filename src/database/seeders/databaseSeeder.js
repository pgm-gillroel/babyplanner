import 'dotenv/config';

// connect to database
export default class DatabaseSeeder {
  constructor(connection) {
    this.connection = connection;
  }

  async connect() {
    const { connection } = this;
  }

  async run(factory, amount) {
    // Connect to the database
    await this.connect();

    if (amount > 1) {
      await factory.makeMany(amount);
    } else {
      await factory.make(amount);
    }
    return factory.inserted;
  }
}
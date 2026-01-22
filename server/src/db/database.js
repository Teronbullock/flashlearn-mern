import { Sequelize } from 'sequelize';

const database = process.env.DATABASE_URL;

if (!database) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

const sequelize = new Sequelize( database, {
  logging: false,
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(
      'Error: Could not connect to the database. Server will not start until database connection is made. ',
      error
    );
  }
};

testDbConnection();

export default sequelize;
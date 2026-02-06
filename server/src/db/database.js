import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { sql } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const client = postgres(connectionString, {prepare: false});
export const db = drizzle(client);

export const testDbConnection = async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('Database connection established');
    return true;
  } catch (error) {
    console.error('Database connection failed', error);
    throw error;
  }
}



// import { Sequelize } from 'sequelize';

// const database = process.env.DATABASE_URL;

// if (!database) {
//   throw new Error('DATABASE_URL is not defined in the environment variables');
// }

// const sequelize = new Sequelize( database, {
//   logging: false,
// });

// const testDbConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error(
//       'Error: Could not connect to the database. Server will not start until database connection is made. ',
//       error
//     );
//   }
// };

testDbConnection();

// export default sequelize;
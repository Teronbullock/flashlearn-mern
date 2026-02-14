import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { sql } from 'drizzle-orm';
import * as schema from '@flashlearn/schema-db';

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


testDbConnection();

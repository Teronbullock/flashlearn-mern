import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

export default {
  development: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
  },
};
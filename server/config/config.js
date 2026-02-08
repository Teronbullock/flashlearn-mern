import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

export default {
  development: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT || 'postgres',
    dialectOptions: {
      // Only enable SSL if the URL contains 'supabase' or if NODE_ENV is production
      ssl: process.env.DATABASE_URL?.includes('supabase') ? {
        require: true,
        rejectUnauthorized: false,
      } : false,
    },
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT || 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
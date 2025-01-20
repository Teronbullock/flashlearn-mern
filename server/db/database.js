import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

const isNetlify = process.env.NETLIFY === 'true';
const isNetlifyDev = process.env.NETLIFY_DEV === 'true';

if (isNetlify || isNetlifyDev) {
  dotenv.config();
} else {
  const __dirname = process.cwd();
  const envPath = path.resolve(__dirname, '../.env');
  dotenv.config({ path: envPath });  
}

const database = process.env.DATABASE_URL;

if (!database) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

const sequelize = new Sequelize( database, {
  logging: false,
});

export default sequelize;
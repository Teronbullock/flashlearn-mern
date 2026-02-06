// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const connectionString = process.env.DATABASE_URL as string;

export default defineConfig({
	out: './drizzle',
  schema: "@/db-schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString
  },
});
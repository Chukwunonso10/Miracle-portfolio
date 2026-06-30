import "dotenv/config";
import { defineConfig } from "prisma/config";

// Use DIRECT_URL for Prisma CLI migrations/db push, and DATABASE_URL for Next.js app queries.
const isPrismaCli = process.argv.some(arg => arg.includes('prisma') || arg.endsWith('ts-node') || arg.endsWith('tsx'));
const databaseUrl = isPrismaCli ? (process.env.DIRECT_URL || process.env.DATABASE_URL) : process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});

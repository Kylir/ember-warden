// ABOUTME: Prisma configuration — defines the database connection for migrations.
// ABOUTME: See https://pris.ly/d/config-datasource for Prisma 7 configuration.

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
});

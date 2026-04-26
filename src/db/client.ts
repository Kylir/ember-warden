// ABOUTME: Shared Prisma client instance.
// ABOUTME: A singleton to avoid exhausting the database connection pool.

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;

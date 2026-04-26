// ABOUTME: Seeds the database with Avios route rates.
// ABOUTME: Run via `npm run db:seed` after migrations.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.routeRate.createMany({
    data: [
      { departureCode: "LHR", arrivalCode: "LAX", valuePerAvios: 0.028 },
      { departureCode: "LHR", arrivalCode: "AMS", valuePerAvios: 0.025 },
      { departureCode: "LHR", arrivalCode: "JFK", valuePerAvios: 0.03 },
      { departureCode: "LGW", arrivalCode: "LAX", valuePerAvios: 0.027 },
      { departureCode: "LGW", arrivalCode: "MUC", valuePerAvios: 0.024 },
      { departureCode: null, arrivalCode: null, valuePerAvios: 0.02 },
    ],
  });
  console.log("Seeded route rates.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

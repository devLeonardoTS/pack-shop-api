import { PrismaClient } from "@prisma/client";
import { BaseConfigsSeeder } from "./seeders/base-configs-seeder";
import { LeadSeeder } from "./seeders/lead-seeder";
import { SeederFn, SeedFactory } from "./utils/seed-factory";

// Seed setup
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log("\n🌱 [Prisma Seed Service]: Started.");

  const seeders: SeederFn[] = [LeadSeeder, BaseConfigsSeeder];

  await SeedFactory(prisma, seeders);

  console.log("🌱 [Prisma Seed Service]: Shutting down.");
}

// Run
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("🌱 [Seed Service]: Something went wrong.\n", e);
    await prisma.$disconnect();
    process.exit(1);
  });

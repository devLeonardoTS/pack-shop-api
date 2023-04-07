import { faker } from "@faker-js/faker";
import { Lead, PrismaClient } from "@prisma/client";

// Seed setup
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.log("\n🌱 Seed Service Started... 🌱");

  console.log("Generating data...");

  const leads: Omit<Lead, "id" | "createdAt">[] = [];

  for (let c = 0; c < 100; c++) {
    leads.push({
      email: faker.internet.email(),
    });
  }

  console.log("🌱 Seeding...");

  await prisma.lead.createMany({ data: leads });

  console.log("Done, shutting down...");
}

// Run
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

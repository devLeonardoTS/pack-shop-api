import { faker } from "@faker-js/faker";
import { Lead, PrismaClient } from "@prisma/client";

export async function LeadSeeder(prismaClient: PrismaClient) {
  console.log("🌱 [LeadSeeder]: Seeding...");
  const leads: Omit<Lead, "id" | "createdAt">[] = [];
  for (let c = 0; c < 40; c++) {
    leads.push({
      email: faker.internet.email(undefined, undefined, "packshop.com"),
    });
  }

  await prismaClient.lead.createMany({ data: leads });
}

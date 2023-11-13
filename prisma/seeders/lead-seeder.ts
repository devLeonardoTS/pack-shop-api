import { faker } from "@faker-js/faker";
import { Lead, PrismaClient } from "@prisma/client";

export async function LeadSeeder(prismaClient: PrismaClient) {
  const leads: Omit<Lead, "id" | "createdAt">[] = [];

  const hasBeenSeeded: boolean = (await prismaClient.lead.count()) > 0;

  if (hasBeenSeeded) {
    // console.log("🌱 [Leads]: Already Seeded.");
    return;
  }

  // console.log("🌱 [Leads]: Seeding...");

  for (let c = 0; c < 40; c++) {
    leads.push({
      email: faker.internet.email(undefined, undefined, "packshop.com"),
    });
  }

  await prismaClient.lead.createMany({ data: leads });
}

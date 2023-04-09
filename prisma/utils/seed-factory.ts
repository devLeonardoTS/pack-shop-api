import { PrismaClient } from "@prisma/client";

export type SeederFn = (prismaClient: PrismaClient) => Promise<void>;

export async function SeedFactory(
  prismaClient: PrismaClient,
  seeders: Array<SeederFn>,
) {
  console.log("🌱 [SeedFactory]: Seeding started.");
  for (const seeder of seeders) {
    await seeder(prismaClient);
  }
  console.log("🌱 [SeedFactory]: Seeding ended.");
}

import { AccountRoleType, PrismaClient } from "@prisma/client";
import { AccountOriginType } from "@src/modules/user-account/entities/account-origin-type.entity";

async function seedAccountOriginTypes(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean =
    (await prismaClient.accountOriginType.count()) > 0;

  if (hasBeenSeeded) {
    console.log("🌱 [AccountOriginTypes]: Already Seeded.");
    return;
  }

  console.log("🌱 [AccountOriginTypes]: Seeding...");

  const objects: Omit<AccountOriginType, "id" | "createdAt">[] = [];

  objects.push(
    {
      origin: "local",
    },
    {
      origin: "google",
    },
    {
      origin: "facebook",
    },
  );

  await prismaClient.accountOriginType.createMany({ data: objects });
}

async function seedAccountRoleTypes(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean =
    (await prismaClient.accountRoleType.count()) > 0;

  if (hasBeenSeeded) {
    console.log("🌱 [AccountRoleTypes]: Already Seeded.");
    return;
  }

  console.log("🌱 [AccountRoleTypes]: Seeding...");

  const objects: Omit<AccountRoleType, "id" | "createdAt">[] = [];

  objects.push(
    {
      role: "admin",
    },
    {
      role: "seller",
    },
    {
      role: "reseller",
    },
    {
      role: "artisan",
    },
    {
      role: "consumer",
    },
  );

  await prismaClient.accountRoleType.createMany({ data: objects });
}

export async function BaseConfigsSeeder(prismaClient: PrismaClient) {
  await seedAccountOriginTypes(prismaClient);
  await seedAccountRoleTypes(prismaClient);
}

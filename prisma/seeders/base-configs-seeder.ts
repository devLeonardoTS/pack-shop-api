import { PrismaClient } from "@prisma/client";
import { createAccountOriginTypes } from "./objects/AccountOriginTypes";
import { createAccountRoleTypes } from "./objects/AccountRoleTypes";
import { createUserAccounts } from "./objects/UserAccounts";

async function seedAccountOriginTypes(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean =
    (await prismaClient.accountOriginType.count()) > 0;

  if (hasBeenSeeded) {
    console.log("🌱 [AccountOriginTypes]: Already Seeded.");
    return;
  }

  console.log("🌱 [AccountOriginTypes]: Seeding...");

  const objects = createAccountOriginTypes();

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

  const objects = createAccountRoleTypes();

  await prismaClient.accountRoleType.createMany({ data: objects });
}

async function seedUserAccounts(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean =
    (await prismaClient.accountRoleType.count()) > 0;

  if (hasBeenSeeded) {
    console.log("🌱 [UserAccounts]: Already Seeded.");
    return;
  }

  console.log("🌱 [UserAccounts]: Seeding...");

  const objects = createUserAccounts();

  await prismaClient.userAccount.createMany({ data: objects });
}

export async function BaseConfigsSeeder(prismaClient: PrismaClient) {
  await seedAccountOriginTypes(prismaClient);
  await seedAccountRoleTypes(prismaClient);
  await seedUserAccounts(prismaClient);
}

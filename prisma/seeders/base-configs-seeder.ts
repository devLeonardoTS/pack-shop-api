import { PrismaClient } from "@prisma/client";
import { createAccountOriginTypes } from "./objects/AccountOriginTypes";
import { createAccountRoleTypes } from "./objects/AccountRoleTypes";
import { createBusinessTypes } from "./objects/BusinessTypes";
import { createPhoneTypes } from "./objects/PhoneTypes";
import { createProductTypes } from "./objects/ProductTypes";
import { createTokenTypes } from "./objects/TokenTypes";
import { createUserAccounts } from "./objects/UserAccounts";

async function seedAccountOriginTypes(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean =
    (await prismaClient.accountOriginType.count()) > 0;

  if (hasBeenSeeded) {
    // console.log("🌱 [AccountOriginTypes]: Already Seeded.");
    return;
  }

  // console.log("🌱 [AccountOriginTypes]: Seeding...");

  const objects = createAccountOriginTypes();

  await prismaClient.accountOriginType.createMany({ data: objects });
}

async function seedAccountRoleTypes(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean =
    (await prismaClient.accountRoleType.count()) > 0;

  if (hasBeenSeeded) {
    // console.log("🌱 [AccountRoleTypes]: Already Seeded.");
    return;
  }

  // console.log("🌱 [AccountRoleTypes]: Seeding...");

  const objects = createAccountRoleTypes();

  await prismaClient.accountRoleType.createMany({ data: objects });
}

async function seedUserAccounts(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean = (await prismaClient.userAccount.count()) > 0;

  if (hasBeenSeeded) {
    // console.log("🌱 [UserAccounts]: Already Seeded.");
    return;
  }

  // console.log("🌱 [UserAccounts]: Seeding...");

  const objects = await createUserAccounts();

  await prismaClient.userAccount.createMany({ data: objects });
}

async function seedTokenTypes(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean = (await prismaClient.tokenType.count()) > 0;

  if (hasBeenSeeded) {
    // console.log("🌱 [TokenTypes]: Already Seeded.");
    return;
  }

  // console.log("🌱 [TokenTypes]: Seeding...");

  const objects = createTokenTypes();

  await prismaClient.tokenType.createMany({ data: objects });
}

async function seedProductTypes(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean = (await prismaClient.productType.count()) > 0;

  if (hasBeenSeeded) {
    // console.log("🌱 [ProductTypes]: Already Seeded.");
    return;
  }

  // console.log("🌱 [ProductTypes]: Seeding...");

  const objects = createProductTypes();

  await prismaClient.productType.createMany({ data: objects });
}

async function seedBusinessTypes(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean = (await prismaClient.businessType.count()) > 0;

  if (hasBeenSeeded) {
    // console.log("🌱 [BusinessTypes]: Already Seeded.");
    return;
  }

  // console.log("🌱 [BusinessTypes]: Seeding...");

  const objects = createBusinessTypes();

  await prismaClient.businessType.createMany({ data: objects });
}

async function seedPhoneTypes(prismaClient: PrismaClient) {
  const hasBeenSeeded: boolean = (await prismaClient.phoneType.count()) > 0;

  if (hasBeenSeeded) {
    // console.log("🌱 [PhoneTypes]: Already Seeded.");
    return;
  }

  // console.log("🌱 [PhoneTypes]: Seeding...");

  const objects = createPhoneTypes();

  await prismaClient.phoneType.createMany({ data: objects });
}

export async function BaseConfigsSeeder(prismaClient: PrismaClient) {
  await seedAccountOriginTypes(prismaClient);
  await seedAccountRoleTypes(prismaClient);
  await seedUserAccounts(prismaClient);
  await seedTokenTypes(prismaClient);
  await seedProductTypes(prismaClient);
  await seedBusinessTypes(prismaClient);
  await seedPhoneTypes(prismaClient);
}

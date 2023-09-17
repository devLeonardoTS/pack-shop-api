import { UserAccount } from "@src/modules/user-account/entities/user-account.entity";

export function createUserAccounts() {
  const data: Omit<UserAccount, "id" | "createdAt" | "updatedAt">[] = [
    {
      originTypeId: 1,
      roleTypeId: 1,
      isActive: true,
      email: "admin@packshop.com",
      password: "admin",
    },
  ];

  const objects: Omit<UserAccount, "id" | "createdAt" | "updatedAt">[] = [];

  data.forEach((item) => objects.push(item));

  return objects;
}

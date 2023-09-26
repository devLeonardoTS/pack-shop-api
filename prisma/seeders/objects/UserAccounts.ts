import { UserAccount } from "@src/modules/user-account/entities/user-account.entity";
import * as bcrypt from "bcrypt";

export async function createUserAccounts() {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash("admin", salt);

  const data: Omit<UserAccount, "id" | "createdAt" | "updatedAt">[] = [
    {
      originTypeId: 1,
      roleTypeId: 1,
      isActive: true,
      email: "admin@packshop.com",
      password,
    },
  ];

  const objects: Omit<UserAccount, "id" | "createdAt" | "updatedAt">[] = [];

  data.forEach((item) => objects.push(item));

  return objects;
}

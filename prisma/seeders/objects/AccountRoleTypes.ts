import { AccountRoleType } from "@prisma/client";
import { EAccountRoleType } from "@src/modules/types/account-role/account-role-type.enum";

export function createAccountRoleTypes() {
  const objects: Omit<AccountRoleType, "id" | "createdAt">[] = [];

  Object.values(EAccountRoleType).forEach((role) => {
    objects.push({ role });
  });

  return objects;
}

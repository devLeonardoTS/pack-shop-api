import { AccountRoleType } from "@src/modules/account-role-type/entities/account-role-type.entity";
import { EAccountRoleType } from "@src/modules/account-role-type/enums/account-role-type.enum";

export function createAccountRoleTypes() {
  const objects: Omit<AccountRoleType, "id" | "createdAt">[] = [];

  Object.values(EAccountRoleType).forEach((role) => {
    objects.push({ role });
  });

  return objects;
}

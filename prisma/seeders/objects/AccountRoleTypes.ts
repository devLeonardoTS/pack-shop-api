import { AccountRoleType } from "@src/modules/account-role-type/entities/account-role-type.entity";
import { UserAccountConstants } from "@src/modules/user-account/constants/user-account.constants";

export function createAccountRoleTypes() {
  const objects: Omit<AccountRoleType, "id" | "createdAt">[] = [];

  Object.values(UserAccountConstants.Roles).forEach((role) => {
    objects.push({ role });
  });

  return objects;
}

import { AccountRoleType } from "@src/modules/account-role-type/entities/account-role-type.entity";

export function createAccountRoleTypes() {
  const types: string[] = [
    "admin",
    "consumer",
    "seller",
    "reseller",
    "artisan",
  ];

  const objects: Omit<AccountRoleType, "id" | "createdAt">[] = [];

  types.forEach((type) => objects.push({ role: type }));

  return objects;
}

import { AccountOriginType } from "@src/modules/account-origin-type/entities/account-origin-type.entity";

export function createAccountOriginTypes() {
  const types: string[] = ["LOCAL", "GOOGLE", "FACEBOOK"];

  const objects: Omit<AccountOriginType, "id" | "createdAt">[] = [];

  types.forEach((type) => objects.push({ origin: type }));

  return objects;
}

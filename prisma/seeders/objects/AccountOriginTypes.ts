import { AccountOriginType } from "@src/modules/account-origin-type/entities/account-origin-type.entity";

export function createAccountOriginTypes() {
  const types: string[] = ["local", "google", "facebook"];

  const objects: Omit<AccountOriginType, "id" | "createdAt">[] = [];

  types.forEach((type) => objects.push({ origin: type }));

  return objects;
}

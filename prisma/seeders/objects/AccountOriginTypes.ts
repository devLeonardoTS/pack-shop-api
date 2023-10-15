import { AccountOriginType } from "@src/modules/account-origin-type/entities/account-origin-type.entity";
import { EAccountOriginType } from "@src/modules/account-origin-type/enums/account-origin-type.enum";

export function createAccountOriginTypes() {
  const objects: Omit<AccountOriginType, "id" | "createdAt">[] = [];

  Object.values(EAccountOriginType).forEach((origin) => {
    objects.push({ origin });
  });

  return objects;
}

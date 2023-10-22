import { AccountOriginType } from "@prisma/client";
import { EAccountOriginType } from "@src/modules/types/account-origin/account-origin-type.enum";

export function createAccountOriginTypes() {
  const objects: Omit<AccountOriginType, "id" | "createdAt">[] = [];

  Object.values(EAccountOriginType).forEach((origin) => {
    objects.push({ origin });
  });

  return objects;
}

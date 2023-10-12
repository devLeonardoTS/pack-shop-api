import { BusinessType } from "@prisma/client";
import { BusinessTypeConstants } from "@src/modules/business-type/constants/business-type.constants";

export function createBusinessTypes() {
  const objects: Omit<BusinessType, "id" | "createdAt">[] = [];

  Object.values(BusinessTypeConstants).forEach((type) =>
    objects.push({ type }),
  );

  return objects;
}

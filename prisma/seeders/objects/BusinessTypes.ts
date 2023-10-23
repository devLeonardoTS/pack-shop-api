import { BusinessType } from "@prisma/client";
import { EBusinessType } from "@src/modules/types/business/business-type.enum";

export function createBusinessTypes() {
  const objects: Omit<BusinessType, "id" | "createdAt">[] = [];

  Object.values(EBusinessType).forEach((type) => objects.push({ type }));

  return objects;
}

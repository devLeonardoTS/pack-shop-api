import { ProductType } from "@prisma/client";
import { EProductType } from "@src/modules/types/product/product-type.enum";

export function createProductTypes() {
  const objects: Omit<ProductType, "id" | "createdAt">[] = [];

  Object.values(EProductType).forEach((type) => {
    objects.push({ type });
  });

  return objects;
}

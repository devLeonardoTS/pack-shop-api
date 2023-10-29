import { PhoneType } from "@prisma/client";
import { EPhoneType } from "@src/modules/types/phone/phone-type.enum";

export function createPhoneTypes() {
  const objects: Omit<PhoneType, "id" | "createdAt">[] = [];

  Object.values(EPhoneType).forEach((type) => {
    objects.push({ type });
  });

  return objects;
}

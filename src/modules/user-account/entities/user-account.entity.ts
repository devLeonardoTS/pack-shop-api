import { AccountOriginType } from "@src/modules/account-origin-type/entities/account-origin-type.entity";
import { AccountRoleType } from "@src/modules/account-role-type/entities/account-role-type.entity";

export class UserAccount {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  originTypeId: number;
  roleTypeId: number;
  email?: string;
  password?: string; // If account Origin is "Local", it should have a password.

  originType?: AccountOriginType;
  roleType?: AccountRoleType;
}

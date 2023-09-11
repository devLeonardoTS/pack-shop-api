import { AccountOriginType } from "./account-origin-type.entity";
import { AccountRoleType } from "./account-role-type.entity";

export class UserAccount {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  email?: string;
  password?: string; // If account Origin is "Local", it should have a password.
  origin?: AccountOriginType;
  role?: AccountRoleType;
}

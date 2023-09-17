export class UserAccount {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  originTypeId: number;
  roleTypeId: number;
  email?: string;
  password?: string; // If account Origin is "Local", it should have a password.
}

import { UserAccount } from "@src/modules/user-account/entities/user-account.entity";

export class BusinessProfile {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  profileSlug: string;
  brand: string;
  nickname: string;
  cnpj: string;
  pictureUrl: string;
  description?: string;

  userAccountId: number;
  userAccount?: UserAccount;
}

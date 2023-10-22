import { UserAccount } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateUserAccountRequest } from "../dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "../dtos/update-user-account.request";

export interface IUserAccountRepository {
  create(createRequest: CreateUserAccountRequest): Promise<UserAccount>;
  findMany(commonQuery: CommonQuery<UserAccount>): Promise<UserAccount[]>;
  findById(id: number): Promise<UserAccount>;
  findByEmail(email: string): Promise<UserAccount>;
  update(id: number, updateReq: UpdateUserAccountRequest): Promise<UserAccount>;
  remove(id: number): Promise<UserAccount>;
  countAll(filters: Partial<UserAccount>): Promise<number>;
}

export const IUserAccountRepository = Symbol("IUserAccountRepository");

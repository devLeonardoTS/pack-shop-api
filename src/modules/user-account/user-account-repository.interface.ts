import { UserAccount } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateUserPJRequest } from "./dtos/create-pj.request";
import { CreateUserAccountRequest } from "./dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "./dtos/update-user-account.request";

export interface IUserAccountRepository {
  create(createRequest: CreateUserAccountRequest): Promise<UserAccount>;
  createPj(createRequest: CreateUserPJRequest): Promise<UserAccount>;
  findMany(commonQuery: CommonQuery<UserAccount>): Promise<UserAccount[]>;
  findOne(commonQuery: CommonQuery<UserAccount>): Promise<UserAccount>;
  update(id: number, updateReq: UpdateUserAccountRequest): Promise<UserAccount>;
  remove(id: number): Promise<UserAccount>;
  countAll(filters: Partial<UserAccount>): Promise<number>;
}

export const IUserAccountRepository = Symbol("IUserAccountRepository");

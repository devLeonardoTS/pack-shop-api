import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateUserAccountRequest } from "../dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "../dtos/update-user-account.request";
import { UserAccount } from "../entities/user-account.entity";

export interface IUserAccountRepository {
  create(createRequest: CreateUserAccountRequest): Promise<UserAccount>;
  findMany(paginationQuery: PaginationQuery): Promise<UserAccount[]>;
  findById(id: number): Promise<UserAccount>;
  update(id: number, updateReq: UpdateUserAccountRequest): Promise<UserAccount>;
  remove(id: number): Promise<UserAccount>;
  countAll(): Promise<number>;
}

export const IUserAccountRepository = Symbol("IUserAccountRepository");

import { AccountRoleType } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateAccountRoleTypeRequest } from "../dtos/create-account-role-type.request";
import { UpdateAccountRoleTypeRequest } from "../dtos/update-account-role-type.request";

export interface IAccountRoleTypeRepository {
  create(createRequest: CreateAccountRoleTypeRequest): Promise<AccountRoleType>;
  findMany(paginationQuery: PaginationQuery): Promise<AccountRoleType[]>;
  findById(id: number): Promise<AccountRoleType>;
  update(
    id: number,
    updateReq: UpdateAccountRoleTypeRequest,
  ): Promise<AccountRoleType>;
  remove(id: number): Promise<AccountRoleType>;
  countAll(): Promise<number>;
}

export const IAccountRoleTypeRepository = Symbol("IAccountRoleTypeRepository");

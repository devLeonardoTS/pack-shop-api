import { AccountRoleType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateAccountRoleTypeRequest } from "./dtos/create-account-role-type.request";
import { UpdateAccountRoleTypeRequest } from "./dtos/update-account-role-type.request";

export interface IAccountRoleTypeRepository {
  create(createRequest: CreateAccountRoleTypeRequest): Promise<AccountRoleType>;
  findMany(
    commonQuery: CommonQuery<AccountRoleType>,
  ): Promise<AccountRoleType[]>;
  findById(id: number): Promise<AccountRoleType>;
  update(
    id: number,
    updateReq: UpdateAccountRoleTypeRequest,
  ): Promise<AccountRoleType>;
  remove(id: number): Promise<AccountRoleType>;
  countAll(filters: Partial<AccountRoleType>): Promise<number>;
}

export const IAccountRoleTypeRepository = Symbol("IAccountRoleTypeRepository");

import { AccountOriginType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateAccountOriginTypeRequest } from "./dtos/create-account-origin-type.request";
import { UpdateAccountOriginTypeRequest } from "./dtos/update-account-origin-type.request";

export interface IAccountOriginTypeRepository {
  create(
    createRequest: CreateAccountOriginTypeRequest,
  ): Promise<AccountOriginType>;
  findMany(
    commonQuery: CommonQuery<AccountOriginType>,
  ): Promise<AccountOriginType[]>;
  findOne(
    commonQuery: CommonQuery<AccountOriginType>,
  ): Promise<AccountOriginType>;
  update(
    id: number,
    updateReq: UpdateAccountOriginTypeRequest,
  ): Promise<AccountOriginType>;
  remove(id: number): Promise<AccountOriginType>;
  countAll(filters: Partial<AccountOriginType>): Promise<number>;
}

export const IAccountOriginTypeRepository = Symbol(
  "IAccountOriginTypeRepository",
);

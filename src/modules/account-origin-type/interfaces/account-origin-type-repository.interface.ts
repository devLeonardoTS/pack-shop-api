import { AccountOriginType } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateAccountOriginTypeRequest } from "../dtos/create-account-origin-type.request";
import { UpdateAccountOriginTypeRequest } from "../dtos/update-account-origin-type.request";

export interface IAccountOriginTypeRepository {
  create(
    createRequest: CreateAccountOriginTypeRequest,
  ): Promise<AccountOriginType>;
  findMany(paginationQuery: PaginationQuery): Promise<AccountOriginType[]>;
  findById(id: number): Promise<AccountOriginType>;
  update(
    id: number,
    updateReq: UpdateAccountOriginTypeRequest,
  ): Promise<AccountOriginType>;
  remove(id: number): Promise<AccountOriginType>;
  countAll(): Promise<number>;
}

export const IAccountOriginTypeRepository = Symbol(
  "IAccountOriginTypeRepository",
);

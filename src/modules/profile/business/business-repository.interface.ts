import { Business } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateBusinessRequest } from "./dto/create-business.request";
import { UpdateBusinessRequest } from "./dto/update-business.request";

export interface IBusinessRepository {
  create(createRequest: CreateBusinessRequest): Promise<Business>;
  findMany(paginationQuery: PaginationQuery): Promise<Business[]>;
  findById(id: number): Promise<Business>;
  findByOwnerId(ownerId: number): Promise<Business>;
  update(id: number, updateReq: UpdateBusinessRequest): Promise<Business>;
  remove(id: number): Promise<Business>;
  countAll(): Promise<number>;
}

export const IBusinessRepository = Symbol("IBusinessRepository");

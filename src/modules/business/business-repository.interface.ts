import { Business } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateBusinessRequest } from "./dto/create-business.request";
import { UpdateBusinessRequest } from "./dto/update-business.request";

export interface IBusinessRepository {
  create(createRequest: CreateBusinessRequest): Promise<Business>;
  findMany(commonQuery: CommonQuery<Business>): Promise<Business[]>;
  findOne(commonQuery: CommonQuery<Business>): Promise<Business>;
  update(id: number, updateReq: UpdateBusinessRequest): Promise<Business>;
  remove(id: number): Promise<Business>;
  countAll(filters: Partial<Business>): Promise<number>;
}

export const IBusinessRepository = Symbol("IBusinessRepository");

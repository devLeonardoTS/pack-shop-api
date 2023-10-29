import { BusinessOwner } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateBusinessOwnerRequest } from "./dto/create-business-owner.request";
import { UpdateBusinessOwnerRequest } from "./dto/update-business-owner.request";

export interface IBusinessOwnerRepository {
  create(createRequest: CreateBusinessOwnerRequest): Promise<BusinessOwner>;
  findMany(commonQuery: CommonQuery<BusinessOwner>): Promise<BusinessOwner[]>;
  findOne(commonQuery: CommonQuery<BusinessOwner>): Promise<BusinessOwner>;
  update(
    id: number,
    updateReq: UpdateBusinessOwnerRequest,
  ): Promise<BusinessOwner>;
  remove(id: number): Promise<BusinessOwner>;
  countAll(filters: Partial<BusinessOwner>): Promise<number>;
}

export const IBusinessOwnerRepository = Symbol("IBusinessOwnerRepository");

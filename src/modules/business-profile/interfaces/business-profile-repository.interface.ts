import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateBusinessProfileRequest } from "../dto/create-business-profile.request";
import { UpdateBusinessProfileRequest } from "../dto/update-business-profile.request";
import { BusinessProfile } from "../entities/business-profile.entity";

export interface IBusinessProfileRepository {
  create(
    requesterId: number,
    createRequest: CreateBusinessProfileRequest,
  ): Promise<BusinessProfile>;
  findMany(paginationQuery: PaginationQuery): Promise<BusinessProfile[]>;
  findById(id: number): Promise<BusinessProfile>;
  update(
    id: number,
    updateReq: UpdateBusinessProfileRequest,
  ): Promise<BusinessProfile>;
  remove(id: number): Promise<BusinessProfile>;
  countAll(): Promise<number>;
}

export const IBusinessProfileRepository = Symbol("IBusinessProfileRepository");

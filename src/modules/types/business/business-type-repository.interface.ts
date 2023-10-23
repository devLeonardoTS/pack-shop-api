import { BusinessType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateBusinessTypeRequest } from "./dtos/create-business-type.request";
import { UpdateBusinessTypeRequest } from "./dtos/update-business-type.request";

export interface IBusinessTypeRepository {
  create(createRequest: CreateBusinessTypeRequest): Promise<BusinessType>;
  findMany(commonQuery: CommonQuery<BusinessType>): Promise<BusinessType[]>;
  findById(id: number): Promise<BusinessType>;
  update(
    id: number,
    updateReq: UpdateBusinessTypeRequest,
  ): Promise<BusinessType>;
  remove(id: number): Promise<BusinessType>;
  countAll(filters: Partial<BusinessType>): Promise<number>;
}

export const IBusinessTypeRepository = Symbol("IBusinessTypeRepository");

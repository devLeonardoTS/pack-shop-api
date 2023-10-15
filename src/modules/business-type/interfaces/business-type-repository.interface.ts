import { BusinessType } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateBusinessTypeRequest } from "../dto/create-business-type.request";
import { UpdateBusinessTypeRequest } from "../dto/update-business-type.request";

export interface IBusinessTypeRepository {
  create(createRequest: CreateBusinessTypeRequest): Promise<BusinessType>;
  findMany(paginationQuery: PaginationQuery): Promise<BusinessType[]>;
  findById(id: number): Promise<BusinessType>;
  update(
    id: number,
    updateReq: UpdateBusinessTypeRequest,
  ): Promise<BusinessType>;
  remove(id: number): Promise<BusinessType>;
  countAll(): Promise<number>;
}

export const IBusinessTypeRepository = Symbol("IBusinessTypeRepository");

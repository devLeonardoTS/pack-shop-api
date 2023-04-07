import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateLeadRequest } from "../dtos/create-lead.request";
import { UpdateLeadRequest } from "../dtos/update-lead.request";
import { Lead } from "../entities/lead.entity";

export interface ILeadsRepository {
  create(createRequest: CreateLeadRequest): Promise<Lead>;
  findMany(paginationQuery: PaginationQuery): Promise<Lead[]>;
  findById(id: number): Promise<Lead>;
  update(id: number, updateReq: UpdateLeadRequest): Promise<Lead>;
  remove(id: number): Promise<Lead>;
  countAll(): Promise<number>;
}

export const ILeadsRepository = Symbol("ILeadsRepository");

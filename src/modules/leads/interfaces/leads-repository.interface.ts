import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateLeadRequest } from "../dtos/create-lead.request";
import { UpdateLeadRequest } from "../dtos/update-lead.request";
import { Lead } from "../entities/lead.entity";

export interface ILeadsRepository {
  create(createRequest: CreateLeadRequest): Promise<Lead>;
  findMany(commonQuery: CommonQuery<Lead>): Promise<Lead[]>;
  findById(id: number): Promise<Lead>;
  update(id: number, updateReq: UpdateLeadRequest): Promise<Lead>;
  remove(id: number): Promise<Lead>;
  countAll(filters: Partial<Lead>): Promise<number>;
}

export const ILeadsRepository = Symbol("ILeadsRepository");

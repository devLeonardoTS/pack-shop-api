import { Phone } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreatePhoneRequest } from "./dto/create-phone.request";
import { UpdatePhoneRequest } from "./dto/update-phone.request";

export interface IPhoneRepository {
  create(createRequest: CreatePhoneRequest): Promise<Phone>;
  findMany(commonQuery: CommonQuery<Phone>): Promise<Phone[]>;
  findOne(commonQuery: CommonQuery<Phone>): Promise<Phone>;
  update(id: number, updateReq: UpdatePhoneRequest): Promise<Phone>;
  remove(id: number): Promise<Phone>;
  countAll(filters: Partial<Phone>): Promise<number>;
}

export const IPhoneRepository = Symbol("IPhoneRepository");

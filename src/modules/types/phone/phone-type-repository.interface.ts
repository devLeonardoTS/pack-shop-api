import { PhoneType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreatePhoneTypeRequest } from "./dtos/create-phone-type.request";
import { UpdatePhoneTypeRequest } from "./dtos/update-phone-type.request";

export interface IPhoneTypeRepository {
  create(createRequest: CreatePhoneTypeRequest): Promise<PhoneType>;
  findMany(commonQuery: CommonQuery<PhoneType>): Promise<PhoneType[]>;
  findOne(commonQuery: CommonQuery<PhoneType>): Promise<PhoneType>;
  update(id: number, updateReq: UpdatePhoneTypeRequest): Promise<PhoneType>;
  remove(id: number): Promise<PhoneType>;
  countAll(filters: Partial<PhoneType>): Promise<number>;
}

export const IPhoneTypeRepository = Symbol("IPhoneTypeRepository");

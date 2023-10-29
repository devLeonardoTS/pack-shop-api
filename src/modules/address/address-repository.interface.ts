import { Address } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateAddressRequest } from "./dto/create-address.request";
import { UpdateAddressRequest } from "./dto/update-address.request";

export interface IAddressRepository {
  create(createRequest: CreateAddressRequest): Promise<Address>;
  findMany(commonQuery: CommonQuery<Address>): Promise<Address[]>;
  findOne(commonQuery: CommonQuery<Address>): Promise<Address>;
  update(id: number, updateReq: UpdateAddressRequest): Promise<Address>;
  remove(id: number): Promise<Address>;
  countAll(filters: Partial<Address>): Promise<number>;
}

export const IAddressRepository = Symbol("IAddressRepository");

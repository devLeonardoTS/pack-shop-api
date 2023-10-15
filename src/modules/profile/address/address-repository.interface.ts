import { Address } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateAddressRequest } from "./dto/create-address.request";
import { UpdateAddressRequest } from "./dto/update-address.request";

export interface IAddressRepository {
  create(createRequest: CreateAddressRequest): Promise<Address>;
  findMany(
    ownerId: number,
    paginationQuery: PaginationQuery,
  ): Promise<Address[]>;
  findById(id: number): Promise<Address>;
  findByOwnerId(ownerId: number): Promise<Address>;
  update(id: number, updateReq: UpdateAddressRequest): Promise<Address>;
  remove(id: number): Promise<Address>;
  countAll(): Promise<number>;
}

export const IAddressRepository = Symbol("IAddressRepository");

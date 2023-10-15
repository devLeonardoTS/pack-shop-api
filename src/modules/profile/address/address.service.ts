import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Address } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { IAddressRepository } from "./address-repository.interface";
import { CreateAddressRequest } from "./dto/create-address.request";
import { UpdateAddressRequest } from "./dto/update-address.request";

@Injectable()
export class AddressService {
  constructor(
    @Inject(IAddressRepository)
    private readonly repository: IAddressRepository,
  ) {}

  async create(createRequest: CreateAddressRequest): Promise<Address> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    ownerId: number,
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<Address>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(ownerId, paginatedRequest);

    const result: PaginationResponse<Address> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<Address> {
    const resource = await this.repository.findById(id);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async findByOwnerId(userAccountId: number): Promise<Address> {
    const resource = await this.repository.findByOwnerId(userAccountId);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async findPrimary(userAccountId: number): Promise<Address> {
    const resource = await this.repository.findPrimary(userAccountId);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateAddressRequest,
  ): Promise<Address> {
    const updated = await this.repository.update(id, updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<Address> {
    return await this.repository.remove(id);
  }
}

import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Address } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
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
    commonQuery: CommonQuery<Address>,
  ): Promise<PaginationResponse<Address>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<Address> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<Address>): Promise<Address> {
    const resource = await this.repository.findOne(commonQuery);
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

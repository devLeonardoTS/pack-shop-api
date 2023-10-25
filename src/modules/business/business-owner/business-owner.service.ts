import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BusinessOwner } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { IBusinessOwnerRepository } from "./business-owner.interface";
import { CreateBusinessOwnerRequest } from "./dto/create-business-owner.request";
import { UpdateBusinessOwnerRequest } from "./dto/update-business-owner.request";

@Injectable()
export class BusinessOwnerService {
  constructor(
    @Inject(IBusinessOwnerRepository)
    private readonly repository: IBusinessOwnerRepository,
  ) {}

  async create(
    createRequest: CreateBusinessOwnerRequest,
  ): Promise<BusinessOwner> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<BusinessOwner>,
  ): Promise<PaginationResponse<BusinessOwner>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<BusinessOwner> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(
    commonQuery: CommonQuery<BusinessOwner>,
  ): Promise<BusinessOwner> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateBusinessOwnerRequest,
  ): Promise<BusinessOwner> {
    const updated = await this.repository.update(id, updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<BusinessOwner> {
    return await this.repository.remove(id);
  }
}

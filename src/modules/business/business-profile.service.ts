import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Business } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { IBusinessRepository } from "./business-repository.interface";
import { CreateBusinessRequest } from "./dto/create-business.request";
import { UpdateBusinessRequest } from "./dto/update-business.request";

@Injectable()
export class BusinessService {
  constructor(
    @Inject(IBusinessRepository)
    private readonly repository: IBusinessRepository,
  ) {}

  async create(createRequest: CreateBusinessRequest): Promise<Business> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<Business>,
  ): Promise<PaginationResponse<Business>> {
    const { filters } = commonQuery;

    const { limit, page } = commonQuery.pagination;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<Business> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<Business>): Promise<Business> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateBusinessRequest,
  ): Promise<Business> {
    const updated = await this.repository.update(id, updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<Business> {
    return await this.repository.remove(id);
  }
}

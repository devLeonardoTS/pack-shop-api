import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BusinessType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { IBusinessTypeRepository } from "./business-type-repository.interface";
import { CreateBusinessTypeRequest } from "./dtos/create-business-type.request";
import { UpdateBusinessTypeRequest } from "./dtos/update-business-type.request";

@Injectable()
export class BusinessTypeService {
  constructor(
    @Inject(IBusinessTypeRepository)
    private readonly repository: IBusinessTypeRepository,
  ) {}

  async create(
    createRequest: CreateBusinessTypeRequest,
  ): Promise<BusinessType> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<BusinessType>,
  ): Promise<PaginationResponse<BusinessType>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<BusinessType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<BusinessType> {
    const resource = await this.repository.findById(id);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateBusinessTypeRequest,
  ): Promise<BusinessType> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<BusinessType> {
    return await this.repository.remove(id);
  }
}
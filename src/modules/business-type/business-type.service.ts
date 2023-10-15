import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BusinessType } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateBusinessTypeRequest } from "./dto/create-business-type.request";
import { UpdateBusinessTypeRequest } from "./dto/update-business-type.request";
import { IBusinessTypeRepository } from "./interfaces/business-type-repository.interface";

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
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<BusinessType>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(paginatedRequest);

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

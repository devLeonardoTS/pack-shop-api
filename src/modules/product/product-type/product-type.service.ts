import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductType } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductTypeRequest } from "./dto/create-product-type.request";
import { UpdateProductTypeRequest } from "./dto/update-product-type.request";
import { IProductTypeRepository } from "./product-type-repository.interface";

@Injectable()
export class ProductTypeService {
  constructor(
    @Inject(IProductTypeRepository)
    private readonly repository: IProductTypeRepository,
  ) {}

  async create(createRequest: CreateProductTypeRequest): Promise<ProductType> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<ProductType>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(paginatedRequest);

    const result: PaginationResponse<ProductType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<ProductType> {
    const resource = await this.repository.findById(id);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateProductTypeRequest,
  ): Promise<ProductType> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<ProductType> {
    return await this.repository.remove(id);
  }
}
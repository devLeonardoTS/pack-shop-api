import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductTypeRequest } from "./dtos/create-product-type.request";
import { UpdateProductTypeRequest } from "./dtos/update-product-type.request";
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
    commonQuery: CommonQuery<ProductType>,
  ): Promise<PaginationResponse<ProductType>> {
    const { filters } = commonQuery;

    const { limit, page } = commonQuery.pagination;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<ProductType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<ProductType>): Promise<ProductType> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
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

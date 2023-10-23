import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductCategory } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductCategoryRequest } from "./dto/create-product-category.request";
import { UpdateProductCategoryRequest } from "./dto/update-product-category.request";
import { IProductCategoryRepository } from "./product-category-repository.interface";

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject(IProductCategoryRepository)
    private readonly repository: IProductCategoryRepository,
  ) {}

  async create(
    createRequest: CreateProductCategoryRequest,
  ): Promise<ProductCategory> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<ProductCategory>,
  ): Promise<PaginationResponse<ProductCategory>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<ProductCategory> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(
    commonQuery: CommonQuery<ProductCategory>,
  ): Promise<ProductCategory> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateProductCategoryRequest,
  ): Promise<ProductCategory> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<ProductCategory> {
    return await this.repository.remove(id);
  }
}

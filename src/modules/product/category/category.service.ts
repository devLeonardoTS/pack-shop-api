import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { ICategoryRepository } from "./category-repository.interface";
import { CreateCategoryRequest } from "./dto/create-category.request";
import { UpdateCategoryRequest } from "./dto/update-category.request";

@Injectable()
export class CategoryService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly repository: ICategoryRepository,
  ) {}

  async create(createRequest: CreateCategoryRequest): Promise<Category> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async createMany(names: string[]): Promise<{ count: number }> {
    return await this.repository.createMany(names);
  }

  async findManyFromProduct(
    productId: number,
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<Category>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findManyFromProduct(
      productId,
      paginatedRequest,
    );

    const result: PaginationResponse<Category> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findMany(
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<Category>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(paginatedRequest);

    const result: PaginationResponse<Category> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<Category> {
    const resource = await this.repository.findById(id);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateCategoryRequest,
  ): Promise<Category> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<Category> {
    return await this.repository.remove(id);
  }
}

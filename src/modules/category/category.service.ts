import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { ICategoryRepository } from "./category-repository.interface";
import { CreateCategoryRequest } from "./dtos/create-category.request";
import { UpdateCategoryRequest } from "./dtos/update-category.request";

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

  async findMany(
    commonQuery: CommonQuery<Category>,
  ): Promise<PaginationResponse<Category>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<Category> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<Category>): Promise<Category> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
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

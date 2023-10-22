import { Category } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateCategoryRequest } from "./dto/create-category.request";
import { UpdateCategoryRequest } from "./dto/update-category.request";

export interface ICategoryRepository {
  create(createRequest: CreateCategoryRequest): Promise<Category>;
  createMany(names: string[]): Promise<{ count: number }>;
  findMany(paginationQuery: PaginationQuery): Promise<Category[]>;
  findManyFromProduct(
    productId: number,
    paginationQuery: PaginationQuery,
  ): Promise<Category[]>;
  findById(id: number): Promise<Category>;
  update(id: number, updateReq: UpdateCategoryRequest): Promise<Category>;
  remove(id: number): Promise<Category>;
  countAll(): Promise<number>;
}

export const ICategoryRepository = Symbol("ICategoryRepository");

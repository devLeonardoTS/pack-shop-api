import { Category } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateCategoryRequest } from "./dtos/create-category.request";
import { UpdateCategoryRequest } from "./dtos/update-category.request";

export interface ICategoryRepository {
  create(createRequest: CreateCategoryRequest): Promise<Category>;
  findMany(commonQuery: CommonQuery<Category>): Promise<Category[]>;
  findOne(commonQuery: CommonQuery<Category>): Promise<Category>;
  update(id: number, updateReq: UpdateCategoryRequest): Promise<Category>;
  remove(id: number): Promise<Category>;
  countAll(filters: Partial<Category>): Promise<number>;
}

export const ICategoryRepository = Symbol("ICategoryRepository");

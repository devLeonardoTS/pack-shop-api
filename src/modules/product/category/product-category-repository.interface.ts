import { ProductCategory } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateProductCategoryRequest } from "./dto/create-product-category.request";
import { UpdateProductCategoryRequest } from "./dto/update-product-category.request";

export interface IProductCategoryRepository {
  connect(
    createRequest: CreateProductCategoryRequest,
  ): Promise<ProductCategory>;
  findMany(
    commonQuery: CommonQuery<ProductCategory>,
  ): Promise<ProductCategory[]>;
  findOne(commonQuery: CommonQuery<ProductCategory>): Promise<ProductCategory>;
  update(
    id: number,
    updateReq: UpdateProductCategoryRequest,
  ): Promise<ProductCategory>;
  remove(id: number): Promise<ProductCategory>;
  countAll(filters: Partial<ProductCategory>): Promise<number>;
}

export const IProductCategoryRepository = Symbol("IProductCategoryRepository");

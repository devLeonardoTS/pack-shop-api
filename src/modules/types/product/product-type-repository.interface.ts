import { ProductType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateProductTypeRequest } from "./dtos/create-product-type.request";
import { UpdateProductTypeRequest } from "./dtos/update-product-type.request";

export interface IProductTypeRepository {
  create(createRequest: CreateProductTypeRequest): Promise<ProductType>;
  findMany(commonQuery: CommonQuery<ProductType>): Promise<ProductType[]>;
  findOne(commonQuery: CommonQuery<ProductType>): Promise<ProductType>;
  update(id: number, updateReq: UpdateProductTypeRequest): Promise<ProductType>;
  remove(id: number): Promise<ProductType>;
  countAll(filters: Partial<ProductType>): Promise<number>;
}

export const IProductTypeRepository = Symbol("IProductTypeRepository");

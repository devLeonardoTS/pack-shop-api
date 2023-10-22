import { ProductType } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateProductTypeRequest } from "./dto/create-product-type.request";
import { UpdateProductTypeRequest } from "./dto/update-product-type.request";

export interface IProductTypeRepository {
  create(createRequest: CreateProductTypeRequest): Promise<ProductType>;
  findMany(paginationQuery: PaginationQuery): Promise<ProductType[]>;
  findById(id: number): Promise<ProductType>;
  update(id: number, updateReq: UpdateProductTypeRequest): Promise<ProductType>;
  remove(id: number): Promise<ProductType>;
  countAll(): Promise<number>;
}

export const IProductTypeRepository = Symbol("IProductTypeRepository");

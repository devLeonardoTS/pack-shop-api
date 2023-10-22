import { Product } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateProductRequest } from "./dto/create-product.request";
import { UpdateProductRequest } from "./dto/update-product.request";

export interface IProductRepository {
  create(createRequest: CreateProductRequest): Promise<Product>;
  findMany(paginationQuery: PaginationQuery): Promise<Product[]>;
  findManyFromOwner(
    profileId: number,
    paginationQuery: PaginationQuery,
  ): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  findByOwnerId(userAccountId: number): Promise<Product>;
  update(id: number, updateReq: UpdateProductRequest): Promise<Product>;
  remove(id: number): Promise<Product>;
  countAll(): Promise<number>;
}

export const IProductRepository = Symbol("IProductRepository");

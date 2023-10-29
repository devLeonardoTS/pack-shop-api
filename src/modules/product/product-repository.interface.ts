import { Product } from "@prisma/client";
import { CommonQuery } from "../common/dtos/common.query";
import { CreateProductRequest } from "./dto/create-product.request";
import { UpdateProductRequest } from "./dto/update-product.request";

export interface IProductRepository {
  create(createRequest: CreateProductRequest): Promise<Product>;
  findMany(commonQuery: CommonQuery<Product>): Promise<Product[]>;
  findOne(commonQuery: CommonQuery<Product>): Promise<Product>;
  update(id: number, updateReq: UpdateProductRequest): Promise<Product>;
  remove(id: number): Promise<Product>;
  countAll(filters: Partial<Product>): Promise<number>;
}

export const IProductRepository = Symbol("IProductRepository");

import { ProductImage } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateProductImageRequest } from "./dto/create-product-image.request";
import { UpdateProductImageRequest } from "./dto/update-product-image.request";

export interface IProductImageRepository {
  create(createRequest: CreateProductImageRequest): Promise<ProductImage>;
  findById(resourceId: number): Promise<ProductImage>;
  findMany(commonQuery: CommonQuery<ProductImage>): Promise<ProductImage[]>;
  update(updateRequest: UpdateProductImageRequest): Promise<ProductImage>;
  remove(resourceId: number): Promise<ProductImage>;
  countAll(): Promise<number>;
}

export const IProductImageRepository = Symbol("IProductImageRepository");

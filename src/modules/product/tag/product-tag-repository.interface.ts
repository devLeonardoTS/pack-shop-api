import { ProductTag } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateProductTagRequest } from "./dto/create-product-tag.request";
import { UpdateProductTagRequest } from "./dto/update-product-tag.request";

export interface IProductTagRepository {
  connect(createRequest: CreateProductTagRequest): Promise<ProductTag>;
  findMany(commonQuery: CommonQuery<ProductTag>): Promise<ProductTag[]>;
  findOne(commonQuery: CommonQuery<ProductTag>): Promise<ProductTag>;
  update(id: number, updateReq: UpdateProductTagRequest): Promise<ProductTag>;
  remove(id: number): Promise<ProductTag>;
  countAll(filters: Partial<ProductTag>): Promise<number>;
}

export const IProductTagRepository = Symbol("IProductTagRepository");

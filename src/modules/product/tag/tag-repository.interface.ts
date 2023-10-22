import { Tag } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateTagRequest } from "./dto/create-tag.request";
import { UpdateTagRequest } from "./dto/update-tag.request";

export interface ITagRepository {
  create(createRequest: CreateTagRequest): Promise<Tag>;
  createMany(names: string[]): Promise<{ count: number }>;
  findMany(paginationQuery: PaginationQuery): Promise<Tag[]>;
  findManyFromProduct(
    productId: number,
    paginationQuery: PaginationQuery,
  ): Promise<Tag[]>;
  findById(id: number): Promise<Tag>;
  update(id: number, updateReq: UpdateTagRequest): Promise<Tag>;
  remove(id: number): Promise<Tag>;
  incrementHit(id: number): Promise<Tag>;
  countAll(): Promise<number>;
}

export const ITagRepository = Symbol("ITagRepository");

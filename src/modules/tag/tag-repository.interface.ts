import { Tag } from "@prisma/client";
import { CommonQuery } from "../common/dtos/common.query";
import { CreateTagRequest } from "./dto/create-tag.request";
import { UpdateTagRequest } from "./dto/update-tag.request";

export interface ITagRepository {
  create(createRequest: CreateTagRequest): Promise<Tag>;
  createMany(createRequest: CreateTagRequest): Promise<{ count: number }>;
  findMany(commonQuery: CommonQuery<Tag>): Promise<Tag[]>;
  findOne(commonQuery: CommonQuery<Tag>): Promise<Tag>;
  update(id: number, updateReq: UpdateTagRequest): Promise<Tag>;
  remove(id: number): Promise<Tag>;
  countAll(filters: Partial<Tag>): Promise<number>;
  incrementField(id: number, field: keyof Tag, value: number): Promise<Tag>;

  // create(createRequest: CreateTagRequest): Promise<Tag>;
  // createMany(names: string[]): Promise<{ count: number }>;
  // findMany(paginationQuery: PaginationQuery): Promise<Tag[]>;
  // findManyFromProduct(
  //   productId: number,
  //   paginationQuery: PaginationQuery,
  // ): Promise<Tag[]>;
  // findById(id: number): Promise<Tag>;
  // update(id: number, updateReq: UpdateTagRequest): Promise<Tag>;
  // remove(id: number): Promise<Tag>;
  // incrementHit(id: number): Promise<Tag>;
  // countAll(): Promise<number>;
}

export const ITagRepository = Symbol("ITagRepository");

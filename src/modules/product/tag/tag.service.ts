import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Tag } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateTagRequest } from "./dto/create-tag.request";
import { UpdateTagRequest } from "./dto/update-tag.request";
import { ITagRepository } from "./tag-repository.interface";

@Injectable()
export class TagService {
  constructor(
    @Inject(ITagRepository)
    private readonly repository: ITagRepository,
  ) {}

  async create(createRequest: CreateTagRequest): Promise<Tag> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async createMany(names: string[]): Promise<{ count: number }> {
    return await this.repository.createMany(names);
  }

  async findManyFromProduct(
    productId: number,
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<Tag>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findManyFromProduct(
      productId,
      paginatedRequest,
    );

    const result: PaginationResponse<Tag> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findMany(
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<Tag>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(paginatedRequest);

    const result: PaginationResponse<Tag> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<Tag> {
    const resource = await this.repository.findById(id);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(id: number, updateRequest: UpdateTagRequest): Promise<Tag> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<Tag> {
    return await this.repository.remove(id);
  }

  async incrementHit(id: number): Promise<Tag> {
    return await this.repository.incrementHit(id);
  }
}

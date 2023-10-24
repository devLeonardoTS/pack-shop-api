import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Tag } from "@prisma/client";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CommonQuery } from "../common/dtos/common.query";
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

  async createMany(
    createRequest: CreateTagRequest,
  ): Promise<{ count: number }> {
    return await this.repository.createMany(createRequest);
  }

  async findMany(
    commonQuery: CommonQuery<Tag>,
  ): Promise<PaginationResponse<Tag>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<Tag> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<Tag>): Promise<Tag> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(id: number, updateRequest: UpdateTagRequest): Promise<Tag> {
    const updated = await this.repository.update(id, updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<Tag> {
    return await this.repository.remove(id);
  }

  async incrementHit(id: number): Promise<Tag> {
    return await this.repository.incrementField(id, "hits", 1);
  }
}

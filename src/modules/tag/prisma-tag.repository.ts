import { Injectable } from "@nestjs/common";
import { Tag } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "../common/dtos/common.query";
import { CreateTagRequest } from "./dto/create-tag.request";
import { UpdateTagRequest } from "./dto/update-tag.request";
import { ITagRepository } from "./tag-repository.interface";

@Injectable()
export class PrismaTagRepository implements ITagRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateTagRequest): Promise<Tag> {
    const { name } = createRequest;
    const created: Tag = await this.db.tag.create({
      data: { name },
    });
    return created;
  }

  async createMany(
    createRequest: CreateTagRequest,
  ): Promise<{ count: number }> {
    const { names } = createRequest;

    const input = names.map((value) => {
      return { name: value };
    });

    const createdCount = await this.db.category.createMany({
      data: input,
      skipDuplicates: true,
    });

    return createdCount;
  }

  async findMany(commonQuery: CommonQuery<Tag>): Promise<Tag[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Tag[] = await this.db.tag.findMany({
      take,
      skip,
      where: filters,
      orderBy,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<Tag>): Promise<Tag> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: Tag = await this.db.tag.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(id: number, updateReq: UpdateTagRequest): Promise<Tag> {
    const { name, hits } = updateReq;
    return await this.db.tag.update({
      where: {
        id,
      },
      data: { name, hits },
    });
  }

  async remove(id: number): Promise<Tag> {
    const removed = await this.db.tag.delete({ where: { id } });
    return removed;
  }

  async incrementField(
    id: number,
    field: keyof Tag,
    value: number,
  ): Promise<Tag> {
    const resource = await this.db.tag.update({
      where: { id },
      data: {
        [field]: { increment: value },
      },
    });
    return resource;
  }

  async countAll(filters: Partial<Tag>): Promise<number> {
    return await this.db.tag.count({ where: filters });
  }
}

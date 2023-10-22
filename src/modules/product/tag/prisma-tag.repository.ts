import { Injectable } from "@nestjs/common";
import { Tag } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
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

  async createMany(names: string[]): Promise<{ count: number }> {
    const input = names.map((name) => {
      return { name };
    });

    const created = await this.db.category.createMany({
      data: input,
      skipDuplicates: true,
    });

    return created;
  }

  async findMany(paginationQuery: PaginationQuery): Promise<Tag[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Tag[] = await this.db.tag.findMany({
      take,
      skip,
    });

    return list;
  }

  async findManyFromProduct(
    productId: number,
    paginationQuery: PaginationQuery,
  ): Promise<Tag[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Tag[] = await this.db.tag.findMany({
      take,
      skip,
      where: {
        productTags: { every: { productId } },
      },
    });

    return list;
  }

  async findById(id: number): Promise<Tag> {
    const item: Tag = await this.db.tag.findFirst({
      where: { id },
    });
    return item;
  }

  async update(id: number, updateReq: UpdateTagRequest): Promise<Tag> {
    const { name } = updateReq;
    return await this.db.tag.update({
      where: {
        id,
      },
      data: { name },
    });
  }

  async remove(id: number): Promise<Tag> {
    const removed = await this.db.tag.delete({ where: { id } });
    return removed;
  }

  async incrementHit(id: number): Promise<Tag> {
    const resource = await this.db.tag.update({
      where: { id },
      data: {
        hits: { increment: 1 },
      },
    });
    return resource;
  }

  async countAll(): Promise<number> {
    return await this.db.tag.count();
  }
}

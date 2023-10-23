import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { ICategoryRepository } from "./category-repository.interface";
import { CreateCategoryRequest } from "./dtos/create-category.request";
import { UpdateCategoryRequest } from "./dtos/update-category.request";

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateCategoryRequest): Promise<Category> {
    const { name } = createRequest;
    const created: Category = await this.db.category.create({
      data: { name },
    });
    return created;
  }

  async findMany(commonQuery: CommonQuery<Category>): Promise<Category[]> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Category[] = await this.db.category.findMany({
      take,
      skip,
      where: filters,
      orderBy,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<Category>): Promise<Category> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const item: Category = await this.db.category.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateCategoryRequest,
  ): Promise<Category> {
    const { name } = updateReq;

    const updatedResource = await this.db.category.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });

    return updatedResource;
  }

  async remove(id: number): Promise<Category> {
    const removed = await this.db.category.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<Category>): Promise<number> {
    return await this.db.category.count({ where: filters });
  }
}

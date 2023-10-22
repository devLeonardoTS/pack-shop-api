import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { ICategoryRepository } from "./category-repository.interface";
import { CreateCategoryRequest } from "./dto/create-category.request";
import { UpdateCategoryRequest } from "./dto/update-category.request";

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

  async findMany(paginationQuery: PaginationQuery): Promise<Category[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Category[] = await this.db.category.findMany({
      take,
      skip,
    });

    return list;
  }

  async findManyFromProduct(
    productId: number,
    paginationQuery: PaginationQuery,
  ): Promise<Category[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Category[] = await this.db.category.findMany({
      take,
      skip,
      where: {
        productCategories: { every: { productId } },
      },
    });

    return list;
  }

  async findById(id: number): Promise<Category> {
    const item: Category = await this.db.category.findFirst({
      where: { id },
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateCategoryRequest,
  ): Promise<Category> {
    const { name } = updateReq;
    return await this.db.category.update({
      where: {
        id,
      },
      data: { name },
    });
  }

  async remove(id: number): Promise<Category> {
    const removed = await this.db.category.delete({ where: { id } });
    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.category.count();
  }
}

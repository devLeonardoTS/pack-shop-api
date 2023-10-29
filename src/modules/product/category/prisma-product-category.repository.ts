import { Injectable } from "@nestjs/common";
import { ProductCategory } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateProductCategoryRequest } from "./dto/create-product-category.request";
import { UpdateProductCategoryRequest } from "./dto/update-product-category.request";
import { IProductCategoryRepository } from "./product-category-repository.interface";

@Injectable()
export class PrismaProductCategoryRepository
  implements IProductCategoryRepository
{
  constructor(private readonly db: PrismaService) {}

  async connect(
    createRequest: CreateProductCategoryRequest,
  ): Promise<ProductCategory> {
    const { categoryId, productId } = createRequest;
    const created: ProductCategory = await this.db.productCategory.create({
      data: { categoryId, productId },
      include: {
        category: true,
        product: { include: { productType: true } },
      },
    });
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<ProductCategory>,
  ): Promise<ProductCategory[]> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ProductCategory[] = await this.db.productCategory.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include: {
        ...include,
        category: true,
        product: { include: { productType: true } },
      },
    });

    return list;
  }

  async findOne(
    commonQuery: CommonQuery<ProductCategory>,
  ): Promise<ProductCategory> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const item: ProductCategory = await this.db.productCategory.findFirst({
      where: filters,
      include: {
        ...include,
        category: true,
        product: { include: { productType: true } },
      },
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateProductCategoryRequest,
  ): Promise<ProductCategory> {
    const { categoryId, productId } = updateReq;
    return await this.db.productCategory.update({
      where: {
        id,
      },
      data: { categoryId, productId },
    });
  }

  async remove(id: number): Promise<ProductCategory> {
    const removed = await this.db.productCategory.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<ProductCategory>): Promise<number> {
    return await this.db.productCategory.count({ where: filters });
  }
}

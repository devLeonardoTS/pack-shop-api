import { Injectable } from "@nestjs/common";
import { ProductType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateProductTypeRequest } from "./dto/create-product-type.request";
import { UpdateProductTypeRequest } from "./dto/update-product-type.request";
import { IProductTypeRepository } from "./product-type-repository.interface";

@Injectable()
export class PrismaProductTypeRepository implements IProductTypeRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateProductTypeRequest): Promise<ProductType> {
    const { type } = createRequest;
    const created: ProductType = await this.db.productType.create({
      data: { type },
    });
    return created;
  }

  async findMany(paginationQuery: PaginationQuery): Promise<ProductType[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ProductType[] = await this.db.productType.findMany({
      take,
      skip,
    });

    return list;
  }

  async findById(id: number): Promise<ProductType> {
    const item: ProductType = await this.db.productType.findFirst({
      where: { id },
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateProductTypeRequest,
  ): Promise<ProductType> {
    const { type } = updateReq;
    return await this.db.productType.update({
      where: {
        id,
      },
      data: { type },
    });
  }

  async remove(id: number): Promise<ProductType> {
    const removed = await this.db.productType.delete({ where: { id } });
    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.productType.count();
  }
}

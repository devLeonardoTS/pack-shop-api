import { Injectable } from "@nestjs/common";
import { ProductType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateProductTypeRequest } from "./dtos/create-product-type.request";
import { UpdateProductTypeRequest } from "./dtos/update-product-type.request";
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

  async findMany(
    commonQuery: CommonQuery<ProductType>,
  ): Promise<ProductType[]> {
    const { filters, orderBy } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ProductType[] = await this.db.productType.findMany({
      take,
      skip,
      where: filters,
      orderBy,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<ProductType>): Promise<ProductType> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: ProductType = await this.db.productType.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateProductTypeRequest,
  ): Promise<ProductType> {
    const { type } = updateReq;

    const updatedResource = await this.db.productType.update({
      where: {
        id: id,
      },
      data: {
        type,
      },
    });

    return updatedResource;
  }

  async remove(id: number): Promise<ProductType> {
    const removed = await this.db.productType.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<ProductType>): Promise<number> {
    return await this.db.productType.count({ where: filters });
  }
}

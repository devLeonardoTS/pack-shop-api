import { Injectable } from "@nestjs/common";
import { ProductTag } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateProductTagRequest } from "./dto/create-product-tag.request";
import { UpdateProductTagRequest } from "./dto/update-product-tag.request";
import { IProductTagRepository } from "./product-tag-repository.interface";

@Injectable()
export class PrismaProductTagRepository implements IProductTagRepository {
  constructor(private readonly db: PrismaService) {}

  async connect(createRequest: CreateProductTagRequest): Promise<ProductTag> {
    const { productId, tagId } = createRequest;
    const created: ProductTag = await this.db.productTag.create({
      data: {
        productId,
        tagId,
      },
      include: {
        product: true,
        tag: true,
      },
    });
    return created;
  }

  async findMany(commonQuery: CommonQuery<ProductTag>): Promise<ProductTag[]> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ProductTag[] = await this.db.productTag.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include: include,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<ProductTag>): Promise<ProductTag> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const item: ProductTag = await this.db.productTag.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateProductTagRequest,
  ): Promise<ProductTag> {
    const { productId, tagId } = updateReq;
    return await this.db.productTag.update({
      where: {
        id,
      },
      data: { productId, tagId },
      include: {
        product: true,
        tag: true,
      },
    });
  }

  async remove(id: number): Promise<ProductTag> {
    const removed = await this.db.productTag.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<ProductTag>): Promise<number> {
    return await this.db.productTag.count({ where: filters });
  }
}

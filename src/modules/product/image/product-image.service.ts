import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductImage } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductImageRequest } from "./dto/create-product-image.request";
import { UpdateProductImageRequest } from "./dto/update-product-image.request";
import { IProductImageRepository } from "./product-image.interface";

@Injectable()
export class ProductImageService {
  constructor(
    @Inject(IProductImageRepository)
    private readonly repository: IProductImageRepository,
  ) {}

  async create(
    createRequest: CreateProductImageRequest,
  ): Promise<ProductImage> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findOne(commonQuery: CommonQuery<ProductImage>): Promise<ProductImage> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async findMany(
    commonQuery: CommonQuery<ProductImage>,
  ): Promise<PaginationResponse<ProductImage>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<ProductImage> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async update(
    updateRequest: UpdateProductImageRequest,
  ): Promise<ProductImage> {
    const updated = await this.repository.update(updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(resourceId: number): Promise<ProductImage> {
    return await this.repository.remove(resourceId);
  }
}

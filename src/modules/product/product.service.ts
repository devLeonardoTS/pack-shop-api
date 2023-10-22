import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductRequest } from "./dto/create-product.request";
import { UpdateProductRequest } from "./dto/update-product.request";
import { IProductRepository } from "./product-repository.interface";

@Injectable()
export class ProductService {
  constructor(
    @Inject(IProductRepository)
    private readonly repository: IProductRepository,
  ) {}

  async create(createRequest: CreateProductRequest): Promise<Product> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<Product>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(paginatedRequest);

    const result: PaginationResponse<Product> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findManyFromOwner(
    profileId: number,
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<Product>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findManyFromOwner(
      profileId,
      paginatedRequest,
    );

    const result: PaginationResponse<Product> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<Product> {
    const resource = await this.repository.findById(id);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async findByOwnerId(userAccountId: number): Promise<Product> {
    const resource = await this.repository.findByOwnerId(userAccountId);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateProductRequest,
  ): Promise<Product> {
    const updated = await this.repository.update(id, updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<Product> {
    return await this.repository.remove(id);
  }
}

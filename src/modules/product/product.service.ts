import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "@prisma/client";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CommonQuery } from "../common/dtos/common.query";
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
    commonQuery: CommonQuery<Product>,
  ): Promise<PaginationResponse<Product>> {
    const { filters } = commonQuery;

    const { limit, page } = commonQuery.pagination;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<Product> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<Product>): Promise<Product> {
    const resource = await this.repository.findOne(commonQuery);
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

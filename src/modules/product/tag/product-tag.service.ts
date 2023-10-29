import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductTag } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductTagRequest } from "./dto/create-product-tag.request";
import { UpdateProductTagRequest } from "./dto/update-product-tag.request";
import { IProductTagRepository } from "./product-tag-repository.interface";

@Injectable()
export class ProductTagService {
  constructor(
    @Inject(IProductTagRepository)
    private readonly repository: IProductTagRepository,
  ) {}

  async connect(createRequest: CreateProductTagRequest): Promise<ProductTag> {
    const created = await this.repository.connect(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<ProductTag>,
  ): Promise<PaginationResponse<ProductTag>> {
    const { filters } = commonQuery;

    const { limit, page } = commonQuery.pagination;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<ProductTag> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<ProductTag>): Promise<ProductTag> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateProductTagRequest,
  ): Promise<ProductTag> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<ProductTag> {
    return await this.repository.remove(id);
  }
}

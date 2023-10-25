import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ImageType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateImageTypeRequest } from "./dtos/create-image-type.request";
import { UpdateImageTypeRequest } from "./dtos/update-image-type.request";
import { IImageTypeRepository } from "./image-type-repository.interface";

@Injectable()
export class ImageTypeService {
  constructor(
    @Inject(IImageTypeRepository)
    private readonly repository: IImageTypeRepository,
  ) {}

  async create(createRequest: CreateImageTypeRequest): Promise<ImageType> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<ImageType>,
  ): Promise<PaginationResponse<ImageType>> {
    const { filters } = commonQuery;

    const { limit, page } = commonQuery.pagination;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<ImageType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<ImageType>): Promise<ImageType> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateImageTypeRequest,
  ): Promise<ImageType> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<ImageType> {
    return await this.repository.remove(id);
  }
}

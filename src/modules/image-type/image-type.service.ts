import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ImageType } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateImageTypeRequest } from "./dto/create-image-type.request";
import { UpdateImageTypeRequest } from "./dto/update-image-type.request";
import { IImageTypeRepository } from "./interfaces/image-type-repository.interface";

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
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<ImageType>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(paginatedRequest);

    const result: PaginationResponse<ImageType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<ImageType> {
    const resource = await this.repository.findById(id);

    if (typeof resource === "undefined") {
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

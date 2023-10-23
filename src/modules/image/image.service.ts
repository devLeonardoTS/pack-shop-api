import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Image } from "@prisma/client";
import { CommonQuery } from "../common/dtos/common.query";
import { PaginationResponse } from "../common/dtos/pagination.response";
import { CreateImageRequest } from "./dtos/create-image.request";
import { UpdateImageRequest } from "./dtos/update-image.request";
import { IImageRepository } from "./image-repository.interface";

@Injectable()
export class ImageService {
  constructor(
    @Inject(IImageRepository)
    private readonly repository: IImageRepository,
  ) {}

  async create(createRequest: CreateImageRequest): Promise<Image> {
    const resource = await this.repository.create(createRequest);

    return resource;
  }

  async findMany(
    commonQuery: CommonQuery<Image>,
  ): Promise<PaginationResponse<Image>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<Image> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<Image> {
    const resource = await this.repository.findOne({
      filters: {
        id,
      },
      include: { imageType: true },
    });

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async findByPublicId(publicId: string): Promise<Image> {
    const resource = await this.repository.findOne({
      filters: {
        publicId,
      },
      include: { imageType: true },
    });

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(id: number, updateRequest: UpdateImageRequest): Promise<Image> {
    const resource = await this.repository.update(id, updateRequest);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async remove(id: number): Promise<Image> {
    const removed = await this.repository.remove(id);
    return removed;
  }
}

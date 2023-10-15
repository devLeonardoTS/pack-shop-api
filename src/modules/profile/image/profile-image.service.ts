import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProfileImage } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProfileImageRequest } from "./dto/create-profile-image.request";
import { UpdateProfileImageRequest } from "./dto/update-profile-image.request";
import { IProfileImageRepository } from "./profile-image.interface";

@Injectable()
export class ProfileImageService {
  constructor(
    @Inject(IProfileImageRepository)
    private readonly repository: IProfileImageRepository,
  ) {}

  async create(
    createRequest: CreateProfileImageRequest,
  ): Promise<ProfileImage> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    ownerId: number,
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<ProfileImage>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(ownerId, paginatedRequest);

    const result: PaginationResponse<ProfileImage> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<ProfileImage> {
    const resource = await this.repository.findById(id);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateProfileImageRequest,
  ): Promise<ProfileImage> {
    const updated = await this.repository.update(id, updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<ProfileImage> {
    return await this.repository.remove(id);
  }
}

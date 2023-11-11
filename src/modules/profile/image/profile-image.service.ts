import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProfileImage } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
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

  async findOne(commonQuery: CommonQuery<ProfileImage>): Promise<ProfileImage> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async findMany(
    commonQuery: CommonQuery<ProfileImage>,
  ): Promise<PaginationResponse<ProfileImage>> {
    const { filters } = commonQuery;

    const { limit, page } = commonQuery.pagination;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<ProfileImage> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async update(
    updateRequest: UpdateProfileImageRequest,
  ): Promise<ProfileImage> {
    const updated = await this.repository.update(updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<ProfileImage> {
    return await this.repository.remove(id);
  }
}

import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Profile } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProfileRequest } from "./dto/create-profile.request";
import { UpdateProfileRequest } from "./dto/update-profile.request";
import { IProfileRepository } from "./profile-repository.interface";

@Injectable()
export class ProfileService {
  constructor(
    @Inject(IProfileRepository)
    private readonly repository: IProfileRepository,
  ) {}

  async create(createRequest: CreateProfileRequest): Promise<Profile> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<Profile>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(paginatedRequest);

    const result: PaginationResponse<Profile> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<Profile> {
    const resource = await this.repository.findById(id);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async findByOwnerId(userAccountId: number): Promise<Profile> {
    const resource = await this.repository.findByOwnerId(userAccountId);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateProfileRequest,
  ): Promise<Profile> {
    const updated = await this.repository.update(id, updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<Profile> {
    return await this.repository.remove(id);
  }
}
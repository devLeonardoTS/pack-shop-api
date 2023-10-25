import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Profile } from "@prisma/client";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CommonQuery } from "../common/dtos/common.query";
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
    commonQuery: CommonQuery<Profile>,
  ): Promise<PaginationResponse<Profile>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<Profile> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<Profile>): Promise<Profile> {
    const resource = await this.repository.findOne(commonQuery);
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

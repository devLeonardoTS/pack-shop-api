import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateBusinessProfileRequest } from "../dto/create-business-profile.request";
import { UpdateBusinessProfileRequest } from "../dto/update-business-profile.request";
import { BusinessProfile } from "../entities/business-profile.entity";
import { IBusinessProfileRepository } from "../interfaces/business-profile-repository.interface";

@Injectable()
export class BusinessProfileService {
  constructor(
    @Inject(IBusinessProfileRepository)
    private readonly businessProfileRepository: IBusinessProfileRepository,
  ) {}

  async create(
    requesterId: number,
    createRequest: CreateBusinessProfileRequest,
  ): Promise<BusinessProfile> {
    const resource = await this.businessProfileRepository.create(
      requesterId,
      createRequest,
    );

    return resource;
  }

  async findMany(
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<BusinessProfile>> {
    const { page, limit } = paginatedRequest;

    const total = await this.businessProfileRepository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.businessProfileRepository.findMany(
      paginatedRequest,
    );

    const result: PaginationResponse<BusinessProfile> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<BusinessProfile> {
    const resource = await this.businessProfileRepository.findById(id);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateBusinessProfileRequest,
  ): Promise<BusinessProfile> {
    const resource = await this.businessProfileRepository.update(
      id,
      updateRequest,
    );

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async remove(id: number): Promise<BusinessProfile> {
    const resource = await this.businessProfileRepository.remove(id);
    return resource;
  }
}

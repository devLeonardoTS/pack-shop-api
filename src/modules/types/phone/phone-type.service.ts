import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PhoneType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreatePhoneTypeRequest } from "./dtos/create-phone-type.request";
import { UpdatePhoneTypeRequest } from "./dtos/update-phone-type.request";
import { IPhoneTypeRepository } from "./phone-type-repository.interface";

@Injectable()
export class PhoneTypeService {
  constructor(
    @Inject(IPhoneTypeRepository)
    private readonly repository: IPhoneTypeRepository,
  ) {}

  async create(createRequest: CreatePhoneTypeRequest): Promise<PhoneType> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<PhoneType>,
  ): Promise<PaginationResponse<PhoneType>> {
    const { filters } = commonQuery;

    const { limit, page } = commonQuery.pagination;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<PhoneType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<PhoneType>): Promise<PhoneType> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdatePhoneTypeRequest,
  ): Promise<PhoneType> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<PhoneType> {
    return await this.repository.remove(id);
  }
}

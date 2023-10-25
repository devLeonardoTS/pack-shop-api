import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Phone } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreatePhoneRequest } from "./dto/create-phone.request";
import { UpdatePhoneRequest } from "./dto/update-phone.request";
import { IPhoneRepository } from "./phone-repository.interface";

@Injectable()
export class PhoneService {
  constructor(
    @Inject(IPhoneRepository)
    private readonly repository: IPhoneRepository,
  ) {}

  async create(createRequest: CreatePhoneRequest): Promise<Phone> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<Phone>,
  ): Promise<PaginationResponse<Phone>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<Phone> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<Phone>): Promise<Phone> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(id: number, updateRequest: UpdatePhoneRequest): Promise<Phone> {
    const updated = await this.repository.update(id, updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<Phone> {
    return await this.repository.remove(id);
  }
}

import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AccountOriginType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { IAccountOriginTypeRepository } from "./account-origin-type-repository.interface";
import { CreateAccountOriginTypeRequest } from "./dtos/create-account-origin-type.request";
import { UpdateAccountOriginTypeRequest } from "./dtos/update-account-origin-type.request";

@Injectable()
export class AccountOriginTypeService {
  constructor(
    @Inject(IAccountOriginTypeRepository)
    private readonly repository: IAccountOriginTypeRepository,
  ) {}

  async create(
    createRequest: CreateAccountOriginTypeRequest,
  ): Promise<AccountOriginType> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<AccountOriginType>,
  ): Promise<PaginationResponse<AccountOriginType>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<AccountOriginType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<AccountOriginType> {
    const resource = await this.repository.findById(id);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateAccountOriginTypeRequest,
  ): Promise<AccountOriginType> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<AccountOriginType> {
    return await this.repository.remove(id);
  }
}

import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AccountRoleType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { IAccountRoleTypeRepository } from "./account-role-type-repository.interface";
import { CreateAccountRoleTypeRequest } from "./dtos/create-account-role-type.request";
import { UpdateAccountRoleTypeRequest } from "./dtos/update-account-role-type.request";

@Injectable()
export class AccountRoleTypeService {
  constructor(
    @Inject(IAccountRoleTypeRepository)
    private readonly repository: IAccountRoleTypeRepository,
  ) {}

  async create(
    createRequest: CreateAccountRoleTypeRequest,
  ): Promise<AccountRoleType> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<AccountRoleType>,
  ): Promise<PaginationResponse<AccountRoleType>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<AccountRoleType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(
    commonQuery: CommonQuery<AccountRoleType>,
  ): Promise<AccountRoleType> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateAccountRoleTypeRequest,
  ): Promise<AccountRoleType> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<AccountRoleType> {
    return await this.repository.remove(id);
  }
}

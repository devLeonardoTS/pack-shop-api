import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateAccountRoleTypeRequest } from "../dtos/create-account-role-type.request";
import { UpdateAccountRoleTypeRequest } from "../dtos/update-account-role-type.request";
import { AccountRoleType } from "../entities/account-role-type.entity";
import { IAccountRoleTypeRepository } from "../interfaces/account-role-type-repository.interface";

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
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<AccountRoleType>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(paginatedRequest);

    const result: PaginationResponse<AccountRoleType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<AccountRoleType> {
    const resource = await this.repository.findById(id);

    if (typeof resource === "undefined") {
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

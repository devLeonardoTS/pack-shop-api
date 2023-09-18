import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateTokenTypeRequest } from "../dto/create-token-type.request";
import { UpdateTokenTypeRequest } from "../dto/update-token-type.request";
import { TokenType } from "../entities/token-type.entity";
import { ITokenTypeRepository } from "../interfaces/token-type-repository.interface";

@Injectable()
export class TokenTypeService {
  constructor(
    @Inject(ITokenTypeRepository)
    private readonly repository: ITokenTypeRepository,
  ) {}

  async create(createRequest: CreateTokenTypeRequest): Promise<TokenType> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<TokenType>> {
    const { page, limit } = paginatedRequest;

    const total = await this.repository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(paginatedRequest);

    const result: PaginationResponse<TokenType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<TokenType> {
    const resource = await this.repository.findById(id);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateTokenTypeRequest,
  ): Promise<TokenType> {
    const updated = await this.repository.update(id, updateRequest);

    if (typeof updated === "undefined") {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<TokenType> {
    return await this.repository.remove(id);
  }
}

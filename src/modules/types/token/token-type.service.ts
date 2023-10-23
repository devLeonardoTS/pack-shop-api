import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TokenType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateTokenTypeRequest } from "./dtos/create-token-type.request";
import { UpdateTokenTypeRequest } from "./dtos/update-token-type.request";
import { ITokenTypeRepository } from "./token-type-repository.interface";

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
    commonQuery: CommonQuery<TokenType>,
  ): Promise<PaginationResponse<TokenType>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<TokenType> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<TokenType>): Promise<TokenType> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
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
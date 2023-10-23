import { Injectable } from "@nestjs/common";
import { TokenType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateTokenTypeRequest } from "./dtos/create-token-type.request";
import { UpdateTokenTypeRequest } from "./dtos/update-token-type.request";
import { ITokenTypeRepository } from "./token-type-repository.interface";

@Injectable()
export class PrismaTokenTypeRepository implements ITokenTypeRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateTokenTypeRequest): Promise<TokenType> {
    const { type } = createRequest;
    const created: TokenType = await this.db.tokenType.create({
      data: { type },
    });
    return created;
  }

  async findMany(commonQuery: CommonQuery<TokenType>): Promise<TokenType[]> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: TokenType[] = await this.db.tokenType.findMany({
      take,
      skip,
      where: filters,
      orderBy,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<TokenType>): Promise<TokenType> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const item: TokenType = await this.db.tokenType.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateTokenTypeRequest,
  ): Promise<TokenType> {
    const { type } = updateReq;

    const updatedResource = await this.db.tokenType.update({
      where: {
        id: id,
      },
      data: {
        type,
      },
    });

    return updatedResource;
  }

  async remove(id: number): Promise<TokenType> {
    const removed = await this.db.tokenType.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<TokenType>): Promise<number> {
    return await this.db.tokenType.count({ where: filters });
  }
}

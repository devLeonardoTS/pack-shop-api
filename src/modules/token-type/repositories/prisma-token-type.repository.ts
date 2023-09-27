import { Injectable } from "@nestjs/common";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateTokenTypeRequest } from "../dto/create-token-type.request";
import { UpdateTokenTypeRequest } from "../dto/update-token-type.request";
import { TokenType } from "../entities/token-type.entity";
import { ITokenTypeRepository } from "../interfaces/token-type-repository.interface";

@Injectable()
export class PrismaTokenTypeRepository implements ITokenTypeRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateTokenTypeRequest): Promise<TokenType> {
    const created: TokenType = await this.db.tokenType.create({
      data: createRequest,
    });
    return created;
  }
  async findMany(paginationQuery: PaginationQuery): Promise<TokenType[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: TokenType[] = await this.db.tokenType.findMany({
      take,
      skip,
    });

    return list;
  }
  async findById(id: number): Promise<TokenType> {
    const item: TokenType = await this.db.tokenType.findFirst({
      where: { id },
    });
    return item;
  }
  async update(
    id: number,
    updateReq: UpdateTokenTypeRequest,
  ): Promise<TokenType> {
    const item = await this.findById(id);
    let updated: TokenType | undefined = undefined;

    if (item && !isNaN(id)) {
      const updateTarget = item;
      const dataSource = updateReq;

      updated = Object.keys(updateTarget).reduce((obj, key) => {
        if (key in dataSource) {
          obj[key] = dataSource[key];
        } else {
          obj[key] = updateTarget[key];
        }
        return obj;
      }, updateTarget);

      updated = await this.db.tokenType.update({
        where: {
          id,
        },
        data: updated,
      });
    }

    return updated;
  }
  async remove(id: number): Promise<TokenType> {
    const removed = await this.db.tokenType.delete({ where: { id } });
    return removed;
  }
  async countAll(): Promise<number> {
    return await this.db.tokenType.count();
  }
}

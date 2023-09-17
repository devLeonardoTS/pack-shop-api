import { Injectable } from "@nestjs/common";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateAccountOriginTypeRequest } from "../dtos/create-account-origin-type.request";
import { UpdateAccountOriginTypeRequest } from "../dtos/update-account-origin-type.request";
import { AccountOriginType } from "../entities/account-origin-type.entity";
import { IAccountOriginTypeRepository } from "../interfaces/account-origin-type-repository.interface";

@Injectable()
export class PrismaAccountOriginTypeRepository
  implements IAccountOriginTypeRepository
{
  constructor(private readonly db: PrismaService) {}

  async create(
    createRequest: CreateAccountOriginTypeRequest,
  ): Promise<AccountOriginType> {
    const created: AccountOriginType = await this.db.accountOriginType.create({
      data: createRequest,
    });
    return created;
  }
  async findMany(
    paginationQuery: PaginationQuery,
  ): Promise<AccountOriginType[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: AccountOriginType[] = await this.db.accountOriginType.findMany({
      take,
      skip,
    });

    return list;
  }
  async findById(id: number): Promise<AccountOriginType> {
    const item: AccountOriginType = await this.db.accountOriginType.findFirst({
      where: { id },
    });
    return item;
  }
  async update(
    id: number,
    updateReq: UpdateAccountOriginTypeRequest,
  ): Promise<AccountOriginType> {
    const item = await this.findById(id);
    let updated: AccountOriginType | undefined = undefined;

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

      updated = await this.db.accountOriginType.update({
        where: {
          id,
        },
        data: updated,
      });
    }

    return updated;
  }
  async remove(id: number): Promise<AccountOriginType> {
    const removed = await this.db.accountOriginType.delete({ where: { id } });
    return removed;
  }
  async countAll(): Promise<number> {
    return await this.db.accountOriginType.count();
  }
}

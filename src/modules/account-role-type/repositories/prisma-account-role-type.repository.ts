import { Injectable } from "@nestjs/common";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateAccountRoleTypeRequest } from "../dtos/create-account-role-type.request";
import { UpdateAccountRoleTypeRequest } from "../dtos/update-account-role-type.request";
import { AccountRoleType } from "../entities/account-role-type.entity";
import { IAccountRoleTypeRepository } from "../interfaces/account-role-type-repository.interface";

@Injectable()
export class PrismaAccountRoleTypeRepository
  implements IAccountRoleTypeRepository
{
  constructor(private readonly db: PrismaService) {}

  async create(
    createRequest: CreateAccountRoleTypeRequest,
  ): Promise<AccountRoleType> {
    const created: AccountRoleType = await this.db.accountRoleType.create({
      data: createRequest,
    });
    return created;
  }
  async findMany(paginationQuery: PaginationQuery): Promise<AccountRoleType[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: AccountRoleType[] = await this.db.accountRoleType.findMany({
      take,
      skip,
    });

    return list;
  }
  async findById(id: number): Promise<AccountRoleType> {
    const item: AccountRoleType = await this.db.accountRoleType.findFirst({
      where: { id },
    });
    return item;
  }
  async update(
    id: number,
    updateReq: UpdateAccountRoleTypeRequest,
  ): Promise<AccountRoleType> {
    const item = await this.findById(id);
    let updated: AccountRoleType | undefined = undefined;

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

      updated = await this.db.accountRoleType.update({
        where: {
          id,
        },
        data: updated,
      });
    }

    return updated;
  }
  async remove(id: number): Promise<AccountRoleType> {
    const removed = await this.db.accountRoleType.delete({ where: { id } });
    return removed;
  }
  async countAll(): Promise<number> {
    return await this.db.accountRoleType.count();
  }
}

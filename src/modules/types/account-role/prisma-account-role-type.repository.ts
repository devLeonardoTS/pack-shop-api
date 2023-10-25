import { Injectable } from "@nestjs/common";
import { AccountRoleType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { IAccountRoleTypeRepository } from "./account-role-type-repository.interface";
import { CreateAccountRoleTypeRequest } from "./dtos/create-account-role-type.request";
import { UpdateAccountRoleTypeRequest } from "./dtos/update-account-role-type.request";

@Injectable()
export class PrismaAccountRoleTypeRepository
  implements IAccountRoleTypeRepository
{
  constructor(private readonly db: PrismaService) {}

  async create(
    createRequest: CreateAccountRoleTypeRequest,
  ): Promise<AccountRoleType> {
    const { role } = createRequest;
    const created: AccountRoleType = await this.db.accountRoleType.create({
      data: { role },
    });
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<AccountRoleType>,
  ): Promise<AccountRoleType[]> {
    const { filters, orderBy } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: AccountRoleType[] = await this.db.accountRoleType.findMany({
      take,
      skip,
      where: filters,
      orderBy,
    });

    return list;
  }

  async findOne(
    commonQuery: CommonQuery<AccountRoleType>,
  ): Promise<AccountRoleType> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: AccountRoleType = await this.db.accountRoleType.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateAccountRoleTypeRequest,
  ): Promise<AccountRoleType> {
    const { role } = updateReq;

    const updatedResource = await this.db.accountRoleType.update({
      where: {
        id: id,
      },
      data: {
        role,
      },
    });

    return updatedResource;
  }

  async remove(id: number): Promise<AccountRoleType> {
    const removed = await this.db.accountRoleType.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<AccountRoleType>): Promise<number> {
    return await this.db.accountRoleType.count({ where: filters });
  }
}

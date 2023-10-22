import { Injectable } from "@nestjs/common";
import { AccountOriginType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { IAccountOriginTypeRepository } from "./account-origin-type-repository.interface";
import { CreateAccountOriginTypeRequest } from "./dtos/create-account-origin-type.request";
import { UpdateAccountOriginTypeRequest } from "./dtos/update-account-origin-type.request";

@Injectable()
export class PrismaAccountOriginTypeRepository
  implements IAccountOriginTypeRepository
{
  constructor(private readonly db: PrismaService) {}
  findManyUserAccounts(
    parentId: number,
    commonQuery: CommonQuery<{ id: number; createdAt: Date; origin: string }>,
  ): Promise<
    {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      isActive: boolean;
      isConfirmed: boolean;
      email: string;
      password: string;
      roleTypeId: number;
      originTypeId: number;
    }[]
  > {
    throw new Error("Method not implemented.");
  }

  async create(
    createRequest: CreateAccountOriginTypeRequest,
  ): Promise<AccountOriginType> {
    const created: AccountOriginType = await this.db.accountOriginType.create({
      data: createRequest,
    });
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<AccountOriginType>,
  ): Promise<AccountOriginType[]> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: AccountOriginType[] = await this.db.accountOriginType.findMany({
      take,
      skip,
      where: filters,
      orderBy,
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
    const { origin } = updateReq;

    const updatedResource = await this.db.accountOriginType.update({
      where: {
        id: id,
      },
      data: {
        origin,
      },
    });

    return updatedResource;
  }

  async remove(id: number): Promise<AccountOriginType> {
    const removed = await this.db.accountOriginType.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<AccountOriginType>): Promise<number> {
    return await this.db.accountOriginType.count({ where: filters });
  }
}

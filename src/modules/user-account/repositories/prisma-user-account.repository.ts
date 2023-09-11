import { Injectable } from "@nestjs/common";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateUserAccountRequest } from "../dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "../dtos/update-user-account.request";
import { UserAccount } from "../entities/user-account.entity";
import { IUserAccountRepository } from "../interfaces/user-account-repository.interface";

@Injectable()
export class PrismaUserAccountRepository implements IUserAccountRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateUserAccountRequest): Promise<UserAccount> {
    const created: UserAccount = await this.db.userAccount.create({
      data: createRequest,
    });
    return created;
  }
  async findMany(paginationQuery: PaginationQuery): Promise<UserAccount[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: UserAccount[] = await this.db.userAccount.findMany({
      take,
      skip,
    });

    return list;
  }
  async findById(id: number): Promise<UserAccount> {
    const item: UserAccount = await this.db.userAccount.findFirst({
      where: { id },
    });
    return item;
  }
  async update(
    id: number,
    updateReq: UpdateUserAccountRequest,
  ): Promise<UserAccount> {
    const item = await this.findById(id);
    let updated: UserAccount | undefined = undefined;

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

      updated = await this.db.userAccount.update({
        where: {
          id,
        },
        data: updated,
      });
    }

    return updated;
  }
  async remove(id: number): Promise<UserAccount> {
    const removed = await this.db.userAccount.delete({ where: { id } });
    return removed;
  }
  async countAll(): Promise<number> {
    return await this.db.userAccount.count();
  }
}

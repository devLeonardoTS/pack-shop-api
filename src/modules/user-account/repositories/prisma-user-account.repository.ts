import { Injectable } from "@nestjs/common";
import { UserAccount } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateUserAccountRequest } from "../dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "../dtos/update-user-account.request";
import { IUserAccountRepository } from "../interfaces/user-account-repository.interface";

@Injectable()
export class PrismaUserAccountRepository implements IUserAccountRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateUserAccountRequest): Promise<UserAccount> {
    const { email, originType, roleType, password } = createRequest;

    const created: UserAccount = await this.db.userAccount.create({
      data: {
        email,
        password,
        roleType: { connect: { role: roleType } },
        originType: { connect: { origin: originType } },
      },
      include: { originType: true, roleType: true },
    });

    return created;
  }

  async findMany(
    commonQuery: CommonQuery<UserAccount>,
  ): Promise<UserAccount[]> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: UserAccount[] = await this.db.userAccount.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include: { originType: true, roleType: true },
    });

    return list;
  }

  async findById(id: number): Promise<UserAccount> {
    const resource: UserAccount = await this.db.userAccount.findFirst({
      where: { id },
      include: {
        originType: true,
        roleType: true,
        profile: {
          include: {
            business: { include: { businessType: true } },
            consumer: true,
            addresses: true,
            profileImages: {
              where: {
                image: { imageType: { type: { contains: "AVATAR " } } },
              },
            },
          },
        },
      },
    });
    return resource;
  }

  async findByEmail(email: string): Promise<UserAccount> {
    const resource: UserAccount = await this.db.userAccount.findFirst({
      where: { email },
      include: {
        originType: true,
        roleType: true,
        profile: {
          include: {
            business: { include: { businessType: true } },
            consumer: true,
            addresses: true,
            profileImages: {
              where: {
                image: { imageType: { type: { contains: "AVATAR " } } },
              },
            },
          },
        },
      },
    });
    return resource;
  }

  async update(
    id: number,
    updateReq: UpdateUserAccountRequest,
  ): Promise<UserAccount> {
    const { newPassword, roleType, isActive, isConfirmed } = updateReq;

    const updated = await this.db.userAccount.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
        isActive,
        isConfirmed,
        roleType: { connect: { role: roleType } },
      },
      include: {
        originType: true,
        roleType: true,
        profile: {
          include: {
            business: { include: { businessType: true } },
            consumer: true,
            addresses: true,
            profileImages: {
              where: {
                image: { imageType: { type: { contains: "AVATAR " } } },
              },
            },
          },
        },
      },
    });

    return updated;
  }

  async remove(id: number): Promise<UserAccount> {
    const removed = await this.db.userAccount.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<UserAccount>): Promise<number> {
    return await this.db.userAccount.count({ where: filters });
  }
}

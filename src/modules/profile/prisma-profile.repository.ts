import { Injectable } from "@nestjs/common";
import { Profile } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateProfileRequest } from "./dto/create-profile.request";
import { UpdateProfileRequest } from "./dto/update-profile.request";
import { IProfileRepository } from "./profile-repository.interface";

@Injectable()
export class PrismaProfileRepository implements IProfileRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateProfileRequest): Promise<Profile> {
    const { userAccountId, description, nickname } = createRequest;

    const created = await this.db.profile.create({
      data: {
        userAccountId,
        description,
        nickname,
      },
      include: {
        business: {
          include: {
            businessType: true,
          },
        },
        consumer: true,
      },
    });

    return created;
  }

  async findMany(paginationQuery: PaginationQuery): Promise<Profile[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Profile[] = await this.db.profile.findMany({
      take,
      skip,
      include: {
        business: { include: { businessType: true } },
        consumer: true,
      },
    });

    return list;
  }

  async findById(id: number): Promise<Profile> {
    const item: Profile = await this.db.profile.findFirst({
      where: { id },
      include: {
        business: { include: { businessType: true } },
        consumer: true,
      },
    });
    return item;
  }

  async findByOwnerId(userAccountId: number): Promise<Profile> {
    const item: Profile = await this.db.profile.findFirst({
      where: { userAccountId },
      include: {
        business: { include: { businessType: true } },
        consumer: true,
      },
    });
    return item;
  }

  async update(id: number, updateReq: UpdateProfileRequest): Promise<Profile> {
    const { description, nickname, slug } = updateReq;

    return await this.db.profile.update({
      where: {
        id,
      },
      data: {
        nickname,
        description,
        slug,
      },
      include: {
        business: {
          include: {
            businessType: true,
          },
        },
        consumer: true,
      },
    });
  }

  async remove(id: number): Promise<Profile> {
    const removed = await this.db.profile.delete({
      where: { id },
      include: {
        business: { include: { businessType: true } },
        consumer: true,
      },
    });
    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.profile.count();
  }
}

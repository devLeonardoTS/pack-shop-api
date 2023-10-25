import { Injectable } from "@nestjs/common";
import { Profile } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "../common/dtos/common.query";
import { CreateProfileRequest } from "./dto/create-profile.request";
import { UpdateProfileRequest } from "./dto/update-profile.request";
import { IProfileRepository } from "./profile-repository.interface";

@Injectable()
export class PrismaProfileRepository implements IProfileRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateProfileRequest): Promise<Profile> {
    const { isSubscribedToOffers, slug, userAccountId } = createRequest;

    const created = await this.db.profile.create({
      data: {
        userAccountId,
        isSubscribedToOffers,
      },
      include: {
        business: true,
        consumer: true,
      },
    });

    return created;
  }

  async findMany(commonQuery: CommonQuery<Profile>): Promise<Profile[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Profile[] = await this.db.profile.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include: {
        ...include,
        business: true,
        consumer: true,
      },
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<Profile>): Promise<Profile> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: Profile = await this.db.profile.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(id: number, updateReq: UpdateProfileRequest): Promise<Profile> {
    const { isSubscribedToOffers, slug } = updateReq;

    return await this.db.profile.update({
      where: {
        id,
      },
      data: {
        isSubscribedToOffers,
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
        business: true,
        consumer: true,
      },
    });
    return removed;
  }

  async countAll(filters: Partial<Profile>): Promise<number> {
    return await this.db.profile.count({ where: filters });
  }
}

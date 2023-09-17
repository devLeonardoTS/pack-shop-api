import { Injectable } from "@nestjs/common";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateBusinessProfileRequest } from "../dto/create-business-profile.request";
import { UpdateBusinessProfileRequest } from "../dto/update-business-profile.request";
import { BusinessProfile } from "../entities/business-profile.entity";
import { IBusinessProfileRepository } from "../interfaces/business-profile-repository.interface";

@Injectable()
export class PrismaBusinessAccountRepository
  implements IBusinessProfileRepository
{
  constructor(private readonly db: PrismaService) {}

  async create(
    createRequest: CreateBusinessProfileRequest,
  ): Promise<BusinessProfile> {
    // ToDo: Get UserAccount Id from Request's Authorization Token.
    const created: BusinessProfile = await this.db.businessProfile.create({
      data: { userAccountId: 1, ...createRequest },
    });

    return created;
  }
  async findMany(paginationQuery: PaginationQuery): Promise<BusinessProfile[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: BusinessProfile[] = await this.db.businessProfile.findMany({
      take,
      skip,
    });

    return list;
  }
  async findById(id: number): Promise<BusinessProfile> {
    const item: BusinessProfile = await this.db.businessProfile.findFirst({
      where: { id },
    });
    return item;
  }
  async update(
    id: number,
    updateReq: UpdateBusinessProfileRequest,
  ): Promise<BusinessProfile> {
    const item = await this.findById(id);
    let updated: BusinessProfile | undefined = undefined;

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

      updated = await this.db.businessProfile.update({
        where: {
          id,
        },
        data: updated,
      });
    }

    return updated;
  }
  async remove(id: number): Promise<BusinessProfile> {
    const removed = await this.db.businessProfile.delete({ where: { id } });
    return removed;
  }
  async countAll(): Promise<number> {
    return await this.db.businessProfile.count();
  }
}

import { Injectable } from "@nestjs/common";
import { Business } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { IBusinessRepository } from "./business-repository.interface";
import { CreateBusinessRequest } from "./dto/create-business.request";
import { UpdateBusinessRequest } from "./dto/update-business.request";

@Injectable()
export class PrismaBusinessRepository implements IBusinessRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateBusinessRequest): Promise<Business> {
    const { brand, businessType, cnpj, profileId } = createRequest;

    const created = await this.db.business.create({
      data: {
        brand,
        cnpj,
        profile: {
          connect: {
            id: profileId,
          },
        },
        businessType: { connect: { type: businessType } },
      },
    });

    return created;
  }

  async findMany(paginationQuery: PaginationQuery): Promise<Business[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Business[] = await this.db.business.findMany({
      take,
      skip,
      include: {
        businessType: true,
      },
    });

    return list;
  }

  async findById(id: number): Promise<Business> {
    const item: Business = await this.db.business.findFirst({
      where: { id },
      include: {
        businessType: true,
      },
    });
    return item;
  }

  async findByOwnerId(ownerId: number): Promise<Business> {
    const item: Business = await this.db.business.findFirst({
      where: { profile: { id: ownerId } },
      include: {
        businessType: true,
      },
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateBusinessRequest,
  ): Promise<Business> {
    const { brand, businessType, cnpj, profileId } = updateReq;

    return await this.db.business.update({
      where: {
        id,
      },
      data: {
        brand,
        cnpj,
        businessType: { connect: { type: businessType } },
      },
      include: {
        businessType: true,
      },
    });
  }

  async remove(id: number): Promise<Business> {
    const removed = await this.db.business.delete({
      where: { id },
      include: {
        businessType: true,
      },
    });
    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.business.count();
  }
}

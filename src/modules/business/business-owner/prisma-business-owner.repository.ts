import { Injectable } from "@nestjs/common";
import { BusinessOwner } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { IBusinessOwnerRepository } from "./business-owner.interface";
import { CreateBusinessOwnerRequest } from "./dto/create-business-owner.request";
import { UpdateBusinessOwnerRequest } from "./dto/update-business-owner.request";

@Injectable()
export class PrismaBusinessOwnerRepository implements IBusinessOwnerRepository {
  constructor(private readonly db: PrismaService) {}

  async create(
    createRequest: CreateBusinessOwnerRequest,
  ): Promise<BusinessOwner> {
    const { cpf, fullName, businessId } = createRequest;

    const created = await this.db.businessOwner.create({
      data: {
        cpf,
        fullName,
        business: businessId && {
          connect: {
            id: businessId,
          },
        },
      },
      include: {
        business: { include: { businessType: true } },
      },
    });

    return created;
  }

  async findMany(
    commonQuery: CommonQuery<BusinessOwner>,
  ): Promise<BusinessOwner[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: BusinessOwner[] = await this.db.businessOwner.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include: {
        ...include,
        businessType: true,
        businessOwner: true,
      },
    });

    return list;
  }

  async findOne(
    commonQuery: CommonQuery<BusinessOwner>,
  ): Promise<BusinessOwner> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: BusinessOwner = await this.db.businessOwner.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateBusinessOwnerRequest,
  ): Promise<BusinessOwner> {
    const { cpf, fullName, businessId } = updateReq;

    return await this.db.businessOwner.update({
      where: {
        id,
      },
      data: {
        cpf,
        fullName,
        business: businessId && {
          connect: {
            id: businessId,
          },
        },
      },
      include: {
        business: { include: { businessType: true } },
      },
    });
  }

  async remove(id: number): Promise<BusinessOwner> {
    const removed = await this.db.businessOwner.delete({
      where: { id },
      include: {
        business: { include: { businessType: true } },
      },
    });
    return removed;
  }

  async countAll(filters: Partial<BusinessOwner>): Promise<number> {
    return await this.db.business.count({ where: filters });
  }
}

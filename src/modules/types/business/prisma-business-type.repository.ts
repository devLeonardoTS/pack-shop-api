import { Injectable } from "@nestjs/common";
import { BusinessType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { IBusinessTypeRepository } from "./business-type-repository.interface";
import { CreateBusinessTypeRequest } from "./dtos/create-business-type.request";
import { UpdateBusinessTypeRequest } from "./dtos/update-business-type.request";

@Injectable()
export class PrismaBusinessTypeRepository implements IBusinessTypeRepository {
  constructor(private readonly db: PrismaService) {}

  async create(
    createRequest: CreateBusinessTypeRequest,
  ): Promise<BusinessType> {
    const { type } = createRequest;
    const created: BusinessType = await this.db.businessType.create({
      data: { type },
    });
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<BusinessType>,
  ): Promise<BusinessType[]> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: BusinessType[] = await this.db.businessType.findMany({
      take,
      skip,
      where: filters,
      orderBy,
    });

    return list;
  }

  async findById(id: number): Promise<BusinessType> {
    const item: BusinessType = await this.db.businessType.findFirst({
      where: { id },
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateBusinessTypeRequest,
  ): Promise<BusinessType> {
    const { type } = updateReq;

    const updatedResource = await this.db.businessType.update({
      where: {
        id: id,
      },
      data: {
        type,
      },
    });

    return updatedResource;
  }

  async remove(id: number): Promise<BusinessType> {
    const removed = await this.db.businessType.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<BusinessType>): Promise<number> {
    return await this.db.businessType.count({ where: filters });
  }
}

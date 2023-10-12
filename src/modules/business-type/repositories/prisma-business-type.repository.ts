import { Injectable } from "@nestjs/common";
import { BusinessType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateBusinessTypeRequest } from "../dto/create-business-type.request";
import { UpdateBusinessTypeRequest } from "../dto/update-business-type.request";
import { IBusinessTypeRepository } from "../interfaces/business-type-repository.interface";

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

  async findMany(paginationQuery: PaginationQuery): Promise<BusinessType[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: BusinessType[] = await this.db.businessType.findMany({
      take,
      skip,
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
    return await this.db.businessType.update({
      where: {
        id,
      },
      data: { type },
    });
  }

  async remove(id: number): Promise<BusinessType> {
    const removed = await this.db.businessType.delete({ where: { id } });
    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.businessType.count();
  }
}

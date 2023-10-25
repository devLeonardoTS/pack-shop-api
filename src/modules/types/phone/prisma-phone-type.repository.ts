import { Injectable } from "@nestjs/common";
import { PhoneType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreatePhoneTypeRequest } from "./dtos/create-phone-type.request";
import { UpdatePhoneTypeRequest } from "./dtos/update-phone-type.request";
import { IPhoneTypeRepository } from "./phone-type-repository.interface";

@Injectable()
export class PrismaPhoneTypeRepository implements IPhoneTypeRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreatePhoneTypeRequest): Promise<PhoneType> {
    const { type } = createRequest;
    const created: PhoneType = await this.db.tokenType.create({
      data: { type },
    });
    return created;
  }

  async findMany(commonQuery: CommonQuery<PhoneType>): Promise<PhoneType[]> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: PhoneType[] = await this.db.tokenType.findMany({
      take,
      skip,
      where: filters,
      orderBy,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<PhoneType>): Promise<PhoneType> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const item: PhoneType = await this.db.tokenType.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdatePhoneTypeRequest,
  ): Promise<PhoneType> {
    const { type } = updateReq;

    const updatedResource = await this.db.tokenType.update({
      where: {
        id: id,
      },
      data: {
        type,
      },
    });

    return updatedResource;
  }

  async remove(id: number): Promise<PhoneType> {
    const removed = await this.db.tokenType.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<PhoneType>): Promise<number> {
    return await this.db.tokenType.count({ where: filters });
  }
}

import { Injectable } from "@nestjs/common";
import { Phone } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreatePhoneRequest } from "./dto/create-phone.request";
import { UpdatePhoneRequest } from "./dto/update-phone.request";
import { IPhoneRepository } from "./phone-repository.interface";

@Injectable()
export class PrismaPhoneRepository implements IPhoneRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreatePhoneRequest): Promise<Phone> {
    const { profileId, number, phoneType, isPrimary } = createRequest;

    const primaryPhone = await this.findOne({
      filters: { profileId, isPrimary: true },
    });

    if (primaryPhone && isPrimary) {
      const updateRequest = { ...createRequest, isPrimary: false };
      await this.update(primaryPhone.id, updateRequest);
    }

    const created = await this.db.phone.create({
      data: {
        number,
        isPrimary,
        phoneType: {
          connect: {
            type: phoneType,
          },
        },
        profile: {
          connect: {
            id: profileId,
          },
        },
      },
      include: {
        phoneType: true,
        profile: true,
      },
    });

    return created;
  }

  async findMany(commonQuery: CommonQuery<Phone>): Promise<Phone[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Phone[] = await this.db.phone.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<Phone>): Promise<Phone> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: Phone = await this.db.phone.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(id: number, updateReq: UpdatePhoneRequest): Promise<Phone> {
    const { profileId, number, phoneType, isPrimary } = updateReq;

    const primaryPhone = await this.findOne({
      filters: { profileId, isPrimary: true },
    });

    if (primaryPhone && isPrimary) {
      const updateRequest = { ...updateReq, isPrimary: false };
      await this.update(primaryPhone.id, updateRequest);
    }

    return await this.db.phone.update({
      where: {
        id,
      },
      data: {
        number,
        phoneType: { connect: { type: phoneType } },
        isPrimary,
      },
      include: {
        phoneType: true,
        profile: true,
      },
    });
  }

  async remove(id: number): Promise<Phone> {
    const removed = await this.db.phone.delete({
      where: { id },
      include: {
        phoneType: true,
        profile: true,
      },
    });
    return removed;
  }

  async countAll(filters: Partial<Phone>): Promise<number> {
    return await this.db.phone.count({ where: filters });
  }
}

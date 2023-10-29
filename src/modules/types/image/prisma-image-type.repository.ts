import { Injectable } from "@nestjs/common";
import { ImageType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateImageTypeRequest } from "./dtos/create-image-type.request";
import { UpdateImageTypeRequest } from "./dtos/update-image-type.request";
import { IImageTypeRepository } from "./image-type-repository.interface";

@Injectable()
export class PrismaImageTypeRepository implements IImageTypeRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateImageTypeRequest): Promise<ImageType> {
    const { type } = createRequest;
    const created: ImageType = await this.db.imageType.create({
      data: { type },
    });
    return created;
  }

  async findMany(commonQuery: CommonQuery<ImageType>): Promise<ImageType[]> {
    const { filters, orderBy } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ImageType[] = await this.db.imageType.findMany({
      take,
      skip,
      where: filters,
      orderBy,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<ImageType>): Promise<ImageType> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: ImageType = await this.db.imageType.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateImageTypeRequest,
  ): Promise<ImageType> {
    const { type } = updateReq;

    const updatedResource = await this.db.imageType.update({
      where: {
        id: id,
      },
      data: {
        type,
      },
    });

    return updatedResource;
  }

  async remove(id: number): Promise<ImageType> {
    const removed = await this.db.imageType.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<ImageType>): Promise<number> {
    return await this.db.imageType.count({ where: filters });
  }
}

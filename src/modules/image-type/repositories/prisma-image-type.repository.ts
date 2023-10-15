import { Injectable } from "@nestjs/common";
import { ImageType } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateImageTypeRequest } from "../dto/create-image-type.request";
import { UpdateImageTypeRequest } from "../dto/update-image-type.request";
import { IImageTypeRepository } from "../interfaces/image-type-repository.interface";

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

  async findMany(paginationQuery: PaginationQuery): Promise<ImageType[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ImageType[] = await this.db.imageType.findMany({
      take,
      skip,
    });

    return list;
  }

  async findById(id: number): Promise<ImageType> {
    const item: ImageType = await this.db.imageType.findFirst({
      where: { id },
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateImageTypeRequest,
  ): Promise<ImageType> {
    const { type } = updateReq;
    return await this.db.imageType.update({
      where: {
        id,
      },
      data: { type },
    });
  }

  async remove(id: number): Promise<ImageType> {
    const removed = await this.db.imageType.delete({ where: { id } });
    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.imageType.count();
  }
}

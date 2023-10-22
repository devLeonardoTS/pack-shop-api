import { ConflictException, Injectable } from "@nestjs/common";
import { Consumer, Prisma } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { ProfileService } from "../profile.service";
import { IConsumerRepository } from "./consumer-repository.interface";
import { CreateConsumerRequest } from "./dto/create-consumer.request";
import { UpdateConsumerRequest } from "./dto/update-consumer.request";

@Injectable()
export class PrismaConsumerRepository implements IConsumerRepository {
  constructor(
    private readonly db: PrismaService,
    private readonly profileService: ProfileService,
  ) {}

  async create(createRequest: CreateConsumerRequest): Promise<Consumer> {
    const { cpf, fullName, birthDate, socialName, profileId } = createRequest;

    await this.checkAlreadySpecialized(profileId);

    const created = await this.db.consumer.create({
      data: {
        cpf,
        fullName,
        birthDate,
        socialName,
        profile: {
          connect: {
            id: profileId,
          },
        },
      },
    });

    return created;
  }

  async findMany(paginationQuery: PaginationQuery): Promise<Consumer[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Consumer[] = await this.db.consumer.findMany({
      take,
      skip,
    });

    return list;
  }

  async findById(id: number): Promise<Consumer> {
    const item: Consumer = await this.db.consumer.findFirst({
      where: { id },
    });
    return item;
  }

  async findByOwnerId(ownerId: number): Promise<Consumer> {
    const item: Consumer = await this.db.consumer.findFirst({
      where: { profile: { id: ownerId } },
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateConsumerRequest,
  ): Promise<Consumer> {
    const { cpf, fullName, birthDate, socialName, profileId } = updateReq;

    return await this.db.consumer.update({
      where: {
        id,
      },
      data: {
        cpf,
        fullName,
        birthDate,
        socialName,
      },
    });
  }

  async remove(id: number): Promise<Consumer> {
    const removed = await this.db.consumer.delete({
      where: { id },
    });
    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.consumer.count();
  }

  async checkAlreadySpecialized(profileId: number): Promise<boolean> {
    const profile = (await this.profileService.findById(
      profileId,
    )) as Prisma.ProfileGetPayload<{
      include: { business: true; consumer: true };
    }>;

    if (profile.consumer) {
      throw new ConflictException("Profile already registered as a Consumer.");
    }

    if (profile.business) {
      throw new ConflictException("Profile already registered as a Business.");
    }

    return false;
  }
}

import { ConflictException, Injectable } from "@nestjs/common";
import { Consumer, Prisma } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "../common/dtos/common.query";
import { ProfileService } from "../profile/profile.service";
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

  async findMany(commonQuery: CommonQuery<Consumer>): Promise<Consumer[]> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Consumer[] = await this.db.consumer.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<Consumer>): Promise<Consumer> {
    const {
      pagination: { limit, page },
      filters,
      orderBy,
      include,
    } = commonQuery;

    const item: Consumer = await this.db.consumer.findFirst({
      where: filters,
      include,
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

  async countAll(filters: Partial<Consumer>): Promise<number> {
    return await this.db.consumer.count({ where: filters });
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

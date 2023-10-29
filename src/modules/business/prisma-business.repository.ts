import { ConflictException, Injectable } from "@nestjs/common";
import { Business, Prisma } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { ProfileService } from "../profile/profile.service";
import { IBusinessRepository } from "./business-repository.interface";
import { CreateBusinessRequest } from "./dto/create-business.request";
import { UpdateBusinessRequest } from "./dto/update-business.request";

@Injectable()
export class PrismaBusinessRepository implements IBusinessRepository {
  constructor(
    private readonly db: PrismaService,
    private readonly profileService: ProfileService,
  ) {}

  async create(createRequest: CreateBusinessRequest): Promise<Business> {
    const {
      cnpj,
      razaoSocial,
      nomeFantasia,
      inscricaoMunicipal,
      inscricaoEstadual,
      dataAbertura,
      businessType,
      profileId,
    } = createRequest;

    await this.checkAlreadySpecialized(profileId);

    const created = await this.db.business.create({
      data: {
        cnpj,
        razaoSocial,
        nomeFantasia,
        inscricaoMunicipal,
        inscricaoEstadual,
        dataAbertura,
        profile: profileId && {
          connect: {
            id: profileId,
          },
        },
        businessType: { connect: { type: businessType } },
      },
      include: {
        businessType: true,
        businessOwner: true,
      },
    });

    return created;
  }

  async findMany(commonQuery: CommonQuery<Business>): Promise<Business[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Business[] = await this.db.business.findMany({
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

  async findOne(commonQuery: CommonQuery<Business>): Promise<Business> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: Business = await this.db.business.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateBusinessRequest,
  ): Promise<Business> {
    const {
      cnpj,
      razaoSocial,
      nomeFantasia,
      inscricaoMunicipal,
      inscricaoEstadual,
      dataAbertura,
      businessType,
    } = updateReq;

    return await this.db.business.update({
      where: {
        id,
      },
      data: {
        cnpj,
        razaoSocial,
        nomeFantasia,
        inscricaoMunicipal,
        inscricaoEstadual,
        dataAbertura,
        businessType: businessType && { connect: { type: businessType } },
      },
      include: {
        businessType: true,
        businessOwner: true,
      },
    });
  }

  async remove(id: number): Promise<Business> {
    const removed = await this.db.business.delete({
      where: { id },
      include: {
        businessType: true,
        businessOwner: true,
      },
    });
    return removed;
  }

  async countAll(filters: Partial<Business>): Promise<number> {
    return await this.db.business.count({ where: filters });
  }

  async checkAlreadySpecialized(profileId: number): Promise<boolean> {
    const profile = (await this.profileService.findOne({
      filters: { id: profileId },
    })) as Prisma.ProfileGetPayload<{
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

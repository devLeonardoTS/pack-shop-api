import { Injectable } from "@nestjs/common";
import { Address } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { IAddressRepository } from "./address-repository.interface";
import { CreateAddressRequest } from "./dto/create-address.request";
import { UpdateAddressRequest } from "./dto/update-address.request";

@Injectable()
export class PrismaAddressRepository implements IAddressRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateAddressRequest): Promise<Address> {
    const {
      pais,
      cep,
      estado,
      cidade,
      bairro,
      logradouro,
      complemento,
      numero,
      isPrimary,
      title,
      description,
      profileId,
    } = createRequest;

    const primaryAddress = await this.findPrimary(createRequest.profileId);

    if (primaryAddress) {
      const updateRequest = { ...createRequest, isPrimary: false };
      await this.update(primaryAddress.id, updateRequest);
    }

    const created = await this.db.address.create({
      data: {
        pais,
        cep,
        estado,
        cidade,
        bairro,
        logradouro,
        complemento,
        numero,
        isPrimary,
        title,
        description,
        profile: {
          connect: {
            id: profileId,
          },
        },
      },
    });

    return created;
  }

  async findMany(
    ownerId: number,
    paginationQuery: PaginationQuery,
  ): Promise<Address[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Address[] = await this.db.address.findMany({
      take,
      skip,
      where: {
        profileId: ownerId,
      },
    });

    return list;
  }

  async findById(id: number): Promise<Address> {
    const item: Address = await this.db.address.findFirst({
      where: { id },
    });
    return item;
  }

  async findByOwnerId(ownerId: number): Promise<Address> {
    const item: Address = await this.db.address.findFirst({
      where: { profile: { id: ownerId } },
    });
    return item;
  }

  async update(id: number, updateReq: UpdateAddressRequest): Promise<Address> {
    const {
      pais,
      cep,
      estado,
      cidade,
      bairro,
      logradouro,
      complemento,
      numero,
      isPrimary,
      title,
      description,
      profileId,
    } = updateReq;

    const primaryAddress = await this.findPrimary(updateReq.profileId);

    if (primaryAddress && isPrimary) {
      const updateRequest = { ...updateReq, isPrimary: false };
      await this.update(primaryAddress.id, updateRequest);
    }

    return await this.db.address.update({
      where: {
        id,
      },
      data: {
        pais,
        cep,
        estado,
        cidade,
        bairro,
        logradouro,
        complemento,
        numero,
        isPrimary,
        title,
        description,
      },
    });
  }

  async remove(id: number): Promise<Address> {
    const removed = await this.db.address.delete({
      where: { id },
    });
    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.address.count();
  }

  async findByQuery(request: Record<string, string>[]): Promise<Address> {
    return null;
  }

  async findPrimary(ownerId: number): Promise<Address> {
    const primaryAddress = await this.db.address.findFirst({
      where: {
        profileId: ownerId,
        isPrimary: true,
      },
    });

    return primaryAddress;
  }
}

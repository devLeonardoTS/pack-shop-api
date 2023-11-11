import { Injectable } from "@nestjs/common";
import { Address } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
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

    const primaryAddress = await this.findOne({
      filters: { profileId, isPrimary: true },
    });

    if (primaryAddress && isPrimary) {
      const updateRequest = { isPrimary: false };
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
        isPrimary: primaryAddress ? isPrimary : true,
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

  async findMany(commonQuery: CommonQuery<Address>): Promise<Address[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Address[] = await this.db.address.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<Address>): Promise<Address> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: Address = await this.db.address.findFirst({
      where: filters,
      include,
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

    const primaryAddress = await this.findOne({
      filters: { profileId, isPrimary: true },
    });

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

  async countAll(filters: Partial<Address>): Promise<number> {
    return await this.db.address.count({ where: filters });
  }
}

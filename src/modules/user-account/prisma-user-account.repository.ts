import { Injectable } from "@nestjs/common";
import { UserAccount } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { EAccountRoleType } from "../types/account-role/account-role-type.enum";
import { CreateUserPFRequest } from "./dtos/create-pf.request";
import { CreateUserPJRequest } from "./dtos/create-pj.request";
import { CreateUserAccountRequest } from "./dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "./dtos/update-user-account.request";
import { IUserAccountRepository } from "./user-account-repository.interface";

@Injectable()
export class PrismaUserAccountRepository implements IUserAccountRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateUserAccountRequest): Promise<UserAccount> {
    const { email, originType, roleType, password } = createRequest;

    const created: UserAccount = await this.db.userAccount.create({
      data: {
        email,
        password,
        roleType: roleType && { connect: { role: roleType } },
        originType: originType && { connect: { origin: originType } },
      },
      include: { originType: true, roleType: true },
    });

    return created;
  }

  async createPj(createRequest: CreateUserPJRequest): Promise<UserAccount> {
    createRequest.roleType = EAccountRoleType.USER;
    createRequest.isPrimaryAddress = true;
    createRequest.isPrimaryPhone = true;

    const {
      bairro,
      businessType,
      cep,
      cidade,
      cnpj,
      complemento,
      cpf,
      dataAbertura,
      email,
      estado,
      fullName,
      inscricaoEstadual,
      inscricaoMunicipal,
      isSubscribedToOffers,
      logradouro,
      nomeFantasia,
      phone,
      numero,
      originType,
      pais,
      phoneType,
      razaoSocial,
      roleType,
      confirmPassword,
      addressDescription,
      isPrimaryAddress,
      isPrimaryPhone,
      password,
      slug,
      addressTitle,
    } = createRequest;

    const createdAccount: UserAccount = await this.db.userAccount.create({
      data: {
        email,
        password,
        roleType: roleType && { connect: { role: roleType } },
        originType: originType && { connect: { origin: originType } },
        profile: {
          create: {
            isSubscribedToOffers,
            addresses: {
              create: {
                pais,
                cep,
                estado,
                cidade,
                bairro,
                logradouro,
                numero,
                complemento,
                title: addressTitle,
                description: addressDescription,
                isPrimary: isPrimaryAddress,
              },
            },
            phones: {
              create: {
                number: phone,
                isPrimary: isPrimaryPhone,
                phoneType: {
                  connect: {
                    type: phoneType,
                  },
                },
              },
            },
            business: {
              create: {
                cnpj,
                dataAbertura,
                inscricaoEstadual,
                inscricaoMunicipal,
                nomeFantasia,
                razaoSocial,
                businessType: { connect: { type: businessType } },
                businessOwner: {
                  create: {
                    cpf,
                    fullName,
                  },
                },
              },
            },
          },
        },
      },
      include: {
        originType: true,
        roleType: true,
        profile: {
          include: {
            business: {
              include: {
                businessOwner: true,
                businessType: true,
              },
            },
            addresses: {
              where: {
                isPrimary: true,
              },
            },
            phones: {
              where: {
                isPrimary: true,
              },
            },
          },
        },
      },
    });

    return createdAccount;
  }

  async createPf(createRequest: CreateUserPFRequest): Promise<UserAccount> {
    createRequest.roleType = EAccountRoleType.USER;
    createRequest.isPrimaryAddress = true;
    createRequest.isPrimaryPhone = true;

    const {
      originType,
      email,
      isSubscribedToOffers,
      fullName,
      socialName,
      birthDate,
      cpf,
      pais,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      complemento,
      phone,
      phoneType,
      roleType,
      password,
      confirmPassword,
      slug,
      isPrimaryAddress,
      addressTitle,
      addressDescription,
      isPrimaryPhone,
    } = createRequest;

    const createdAccount: UserAccount = await this.db.userAccount.create({
      data: {
        email,
        password,
        roleType: roleType && { connect: { role: roleType } },
        originType: originType && { connect: { origin: originType } },
        profile: {
          create: {
            isSubscribedToOffers,
            addresses: {
              create: {
                pais,
                cep,
                estado,
                cidade,
                bairro,
                logradouro,
                numero,
                complemento,
                title: addressTitle,
                description: addressDescription,
                isPrimary: isPrimaryAddress,
              },
            },
            phones: {
              create: {
                number: phone,
                isPrimary: isPrimaryPhone,
                phoneType: {
                  connect: {
                    type: phoneType,
                  },
                },
              },
            },
            consumer: {
              create: {
                cpf,
                fullName,
                birthDate,
                socialName,
              },
            },
          },
        },
      },
      include: {
        originType: true,
        roleType: true,
        profile: {
          include: {
            consumer: true,
            addresses: {
              where: {
                isPrimary: true,
              },
            },
            phones: {
              where: {
                isPrimary: true,
              },
            },
          },
        },
      },
    });

    return createdAccount;
  }

  async findMany(
    commonQuery: CommonQuery<UserAccount>,
  ): Promise<UserAccount[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: UserAccount[] = await this.db.userAccount.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include: {
        ...include,
        roleType: true,
        originType: true,
        profile: true,
      },
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<UserAccount>): Promise<UserAccount> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: UserAccount = await this.db.userAccount.findFirst({
      where: filters,
      include: {
        ...include,
        originType: true,
        roleType: true,
        profile: {
          include: {
            business: { include: { businessType: true } },
            consumer: true,
            addresses: {
              where: {
                isPrimary: true,
              },
            },
            phones: {
              where: { isPrimary: true },
            },
            profileImages: {
              where: {
                image: { imageType: { type: { contains: "AVATAR" } } },
              },
            },
          },
        },
      },
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateUserAccountRequest,
  ): Promise<UserAccount> {
    const { newPassword, roleType, isActive, isConfirmed } = updateReq;

    const updated = await this.db.userAccount.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
        isActive,
        isConfirmed,
        roleType: roleType && { connect: { role: roleType } },
      },
      include: {
        originType: true,
        roleType: true,
        profile: {
          include: {
            business: { include: { businessType: true } },
            consumer: true,
            addresses: {
              where: {
                isPrimary: true,
              },
            },
            phones: {
              where: { isPrimary: true },
            },
            profileImages: {
              where: {
                image: { imageType: { type: { contains: "AVATAR" } } },
              },
            },
          },
        },
      },
    });

    return updated;
  }

  async remove(id: number): Promise<UserAccount> {
    const removed = await this.db.userAccount.delete({ where: { id } });
    return removed;
  }

  async countAll(filters: Partial<UserAccount>): Promise<number> {
    return await this.db.userAccount.count({ where: filters });
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { UserAccount } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import * as bcrypt from "bcrypt";
import { CreateUserPJRequest } from "./dtos/create-pj.request";
import { CreateUserAccountRequest } from "./dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "./dtos/update-user-account.request";
import { IUserAccountRepository } from "./user-account-repository.interface";

@Injectable()
export class UserAccountService {
  private readonly passwordMatchErrorMsg =
    "Password and Confirmation Password does not match.";

  constructor(
    @Inject(IUserAccountRepository)
    private readonly repository: IUserAccountRepository,
  ) {}

  async create(createRequest: CreateUserAccountRequest): Promise<UserAccount> {
    createRequest = await this.createAccountValidation(createRequest);

    const resource = await this.repository.create(createRequest);

    return resource;
  }

  async createPj(createRequest: CreateUserPJRequest): Promise<UserAccount> {
    createRequest = (await this.createAccountValidation(
      createRequest,
    )) as CreateUserPJRequest;

    const resource = await this.repository.createPj(createRequest);

    return resource;
  }

  async findMany(
    commonQuery: CommonQuery<UserAccount>,
  ): Promise<PaginationResponse<UserAccount>> {
    const { filters } = commonQuery;

    const { limit, page } = commonQuery.pagination;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<UserAccount> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<UserAccount>): Promise<UserAccount> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateUserAccountRequest,
  ): Promise<UserAccount> {
    updateRequest = await this.updateAccountValidation(id, updateRequest);

    const resource = await this.repository.update(id, updateRequest);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async remove(id: number): Promise<UserAccount> {
    const resource = await this.repository.remove(id);
    return resource;
  }

  private async passwordEncryption(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }

  private async createAccountValidation(
    createRequest: CreateUserAccountRequest,
  ): Promise<CreateUserAccountRequest> {
    const hasPassword =
      createRequest.password?.length && createRequest.confirmPassword?.length;

    const isPasswordConfirmed =
      createRequest.password === createRequest.confirmPassword;

    if (!hasPassword || !isPasswordConfirmed) {
      throw new BadRequestException(this.passwordMatchErrorMsg);
    }

    // Encrypt
    createRequest.password = await this.passwordEncryption(
      createRequest.password,
    );

    return createRequest;
  }

  private async updateAccountValidation(
    id: number,
    updateRequest: UpdateUserAccountRequest,
  ): Promise<UpdateUserAccountRequest> {
    const userAccount = await this.repository.findOne({ filters: { id } });

    const isPasswordValid = await bcrypt.compare(
      updateRequest.currentPassword,
      userAccount.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const hasNewPassword =
      updateRequest.newPassword?.length &&
      updateRequest.confirmNewPassword?.length;

    const isPasswordConfirmed =
      updateRequest.newPassword === updateRequest.confirmNewPassword;

    if (!hasNewPassword || !isPasswordConfirmed) {
      throw new BadRequestException(this.passwordMatchErrorMsg);
    }

    // Encrypt
    updateRequest.newPassword = await this.passwordEncryption(
      updateRequest.newPassword,
    );

    return updateRequest;
  }
}

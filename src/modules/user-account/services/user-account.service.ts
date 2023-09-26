import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { AccountOriginTypeService } from "@src/modules/account-origin-type/services/account-origin-type.service";
import { AccountRoleTypeService } from "@src/modules/account-role-type/services/account-role-type.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import * as bcrypt from "bcrypt";
import { CreateUserAccountRequest } from "../dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "../dtos/update-user-account.request";
import { UserAccount } from "../entities/user-account.entity";
import { IUserAccountRepository } from "../interfaces/user-account-repository.interface";

@Injectable()
export class UserAccountService {
  constructor(
    @Inject(IUserAccountRepository)
    private readonly userAccountRepository: IUserAccountRepository,
    private readonly accountOriginTypeService: AccountOriginTypeService,
    private readonly accountRoleTypeService: AccountRoleTypeService,
  ) {}

  async create(createRequest: CreateUserAccountRequest): Promise<UserAccount> {
    createRequest = await this.createAccountValidation(createRequest);

    const resource = await this.userAccountRepository.create(createRequest);

    return resource;
  }

  async findMany(
    paginatedRequest: PaginationQuery,
  ): Promise<PaginationResponse<UserAccount>> {
    const { page, limit } = paginatedRequest;

    const total = await this.userAccountRepository.countAll();
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.userAccountRepository.findMany(paginatedRequest);

    const result: PaginationResponse<UserAccount> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findById(id: number): Promise<UserAccount> {
    const resource = await this.userAccountRepository.findById(id);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async findByEmail(email: string): Promise<UserAccount> {
    const resource = await this.userAccountRepository.findByEmail(email);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateUserAccountRequest,
  ): Promise<UserAccount> {
    updateRequest = await this.updateAccountValidation(id, updateRequest);

    const resource = await this.userAccountRepository.update(id, updateRequest);

    if (typeof resource === "undefined") {
      throw new NotFoundException();
    }

    return resource;
  }

  async remove(id: number): Promise<UserAccount> {
    const resource = await this.userAccountRepository.remove(id);
    return resource;
  }

  async checkRoleType(id: number) {
    const type = await this.accountRoleTypeService.findById(id);
    if (!type) {
      throw new BadRequestException(
        "roleTypeId is invalid, check the list of available roles at GET: /account-role-type",
      );
    }
    return type;
  }

  async checkOriginType(id: number) {
    const type = await this.accountOriginTypeService.findById(id);
    if (!type) {
      throw new BadRequestException(
        "originTypeId is invalid, check the list of available roles at GET: /account-origin-type",
      );
    }
    return type;
  }

  async passwordEncryption(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }

  async createAccountValidation(
    createRequest: CreateUserAccountRequest,
  ): Promise<CreateUserAccountRequest> {
    const hasPassword =
      createRequest.password?.length && createRequest.confirmPassword?.length;

    const isPasswordConfirmed =
      createRequest.password === createRequest.confirmPassword;

    if (!hasPassword || !isPasswordConfirmed) {
      throw new BadRequestException(
        "Password and Confirmation Password does not match.",
      );
    }

    // Encrypt
    createRequest.password = await this.passwordEncryption(
      createRequest.password,
    );

    await this.checkOriginType(createRequest.originTypeId);
    await this.checkRoleType(createRequest.roleTypeId);

    return createRequest;
  }

  async updateAccountValidation(
    id: number,
    updateRequest: UpdateUserAccountRequest,
  ): Promise<UpdateUserAccountRequest> {
    const userAccount = await this.userAccountRepository.findById(id);

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
      throw new BadRequestException(
        "Password and Confirmation Password does not match.",
      );
    }

    // Encrypt
    updateRequest.newPassword = await this.passwordEncryption(
      updateRequest.newPassword,
    );

    await this.checkRoleType(updateRequest.roleTypeId);

    return updateRequest;
  }
}

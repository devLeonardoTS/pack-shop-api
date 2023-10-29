import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { AccountRoleType, UserAccount } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { UserAccountService } from "@src/modules/user-account/user-account.service";
import { AccountRoleTypeService } from "./account-role-type.service";
import { CreateAccountRoleTypeRequest } from "./dtos/create-account-role-type.request";
import { UpdateAccountRoleTypeRequest } from "./dtos/update-account-role-type.request";

@Controller("types/account-role")
export class AccountRoleTypeController {
  constructor(
    private readonly accountRoleTypeService: AccountRoleTypeService,
    private readonly userAccountService: UserAccountService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateAccountRoleTypeRequest,
  ): Promise<AccountRoleType> {
    return await this.accountRoleTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<AccountRoleType>,
  ): Promise<PaginationResponse<AccountRoleType>> {
    const result = await this.accountRoleTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<AccountRoleType>,
  ): Promise<AccountRoleType> {
    query.filters.id = id;
    return this.accountRoleTypeService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateAccountRoleTypeRequest,
  ): Promise<AccountRoleType> {
    return await this.accountRoleTypeService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<AccountRoleType> {
    return await this.accountRoleTypeService.remove(id);
  }

  @Get(":id/user-account")
  async findManyUserAccounts(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<UserAccount>,
  ): Promise<PaginationResponse<UserAccount>> {
    query.filters.roleTypeId = id;
    const result = await this.userAccountService.findMany(query);
    return result;
  }
}

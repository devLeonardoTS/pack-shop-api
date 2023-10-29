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
import { AccountOriginType, UserAccount } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { UserAccountService } from "@src/modules/user-account/user-account.service";
import { AccountOriginTypeService } from "./account-origin-type.service";
import { CreateAccountOriginTypeRequest } from "./dtos/create-account-origin-type.request";
import { UpdateAccountOriginTypeRequest } from "./dtos/update-account-origin-type.request";

@Controller("types/account-origin")
export class AccountOriginTypeController {
  constructor(
    private readonly accountOriginTypeService: AccountOriginTypeService,
    private readonly userAccountService: UserAccountService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateAccountOriginTypeRequest,
  ): Promise<AccountOriginType> {
    return await this.accountOriginTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<AccountOriginType>,
  ): Promise<PaginationResponse<AccountOriginType>> {
    const result = await this.accountOriginTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<AccountOriginType>,
  ): Promise<AccountOriginType> {
    query.filters.id = id;
    return this.accountOriginTypeService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateAccountOriginTypeRequest,
  ): Promise<AccountOriginType> {
    return await this.accountOriginTypeService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<AccountOriginType> {
    return await this.accountOriginTypeService.remove(id);
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

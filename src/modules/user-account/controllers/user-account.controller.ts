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
import { UserAccount } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateUserPJRequest } from "../dtos/create-pj.request";
import { CreateUserAccountRequest } from "../dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "../dtos/update-user-account.request";
import { UserAccountService } from "../user-account.service";

@Controller("user-account")
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Post()
  async create(
    @Body() createRequest: CreateUserAccountRequest,
  ): Promise<UserAccount> {
    return await this.userAccountService.create(createRequest);
  }

  @Post("pj")
  async createPj(
    @Body() createRequest: CreateUserPJRequest,
  ): Promise<UserAccount> {
    return await this.userAccountService.createPj(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<UserAccount>,
  ): Promise<PaginationResponse<UserAccount>> {
    const result = await this.userAccountService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<UserAccount>,
  ): Promise<UserAccount> {
    query.filters.id = id;
    return this.userAccountService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateUserAccountRequest,
  ): Promise<UserAccount> {
    return await this.userAccountService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<UserAccount> {
    return await this.userAccountService.remove(id);
  }
}

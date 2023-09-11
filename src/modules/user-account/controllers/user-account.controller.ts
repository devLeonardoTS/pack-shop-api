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
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateUserAccountRequest } from "../dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "../dtos/update-user-account.request";
import { UserAccount } from "../entities/user-account.entity";
import { UserAccountService } from "../services/user-account.service";

@Controller("user-account")
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Post()
  async create(
    @Body() createRequest: CreateUserAccountRequest,
  ): Promise<UserAccount> {
    return await this.userAccountService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<UserAccount>> {
    const result = await this.userAccountService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<UserAccount> {
    return this.userAccountService.findById(id);
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

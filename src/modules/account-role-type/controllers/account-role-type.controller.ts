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
import { CreateAccountRoleTypeRequest } from "../dtos/create-account-role-type.request";
import { UpdateAccountRoleTypeRequest } from "../dtos/update-account-role-type.request";
import { AccountRoleType } from "../entities/account-role-type.entity";
import { AccountRoleTypeService } from "../services/account-role-type.service";

@Controller("account-role-type")
export class AccountRoleTypeController {
  constructor(
    private readonly accountRoleTypeService: AccountRoleTypeService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateAccountRoleTypeRequest,
  ): Promise<AccountRoleType> {
    return await this.accountRoleTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<AccountRoleType>> {
    const result = await this.accountRoleTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<AccountRoleType> {
    return this.accountRoleTypeService.findById(id);
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
}

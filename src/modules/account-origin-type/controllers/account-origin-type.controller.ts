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
import { CreateAccountOriginTypeRequest } from "../dtos/create-account-origin-type.request";
import { UpdateAccountOriginTypeRequest } from "../dtos/update-account-origin-type.request";
import { AccountOriginType } from "../entities/account-origin-type.entity";
import { AccountOriginTypeService } from "../services/account-origin-type.service";

@Controller("account-origin-type")
export class AccountOriginTypeController {
  constructor(
    private readonly accountOriginTypeService: AccountOriginTypeService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateAccountOriginTypeRequest,
  ): Promise<AccountOriginType> {
    return await this.accountOriginTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<AccountOriginType>> {
    const result = await this.accountOriginTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<AccountOriginType> {
    return this.accountOriginTypeService.findById(id);
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
}

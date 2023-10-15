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
import { BusinessType } from "@prisma/client";
import { PaginationQuery } from "../common/dtos/pagination.query";
import { PaginationResponse } from "../common/dtos/pagination.response";
import { BusinessTypeService } from "./business-type.service";
import { CreateBusinessTypeRequest } from "./dto/create-business-type.request";
import { UpdateBusinessTypeRequest } from "./dto/update-business-type.request";

@Controller("business-type")
export class BusinessTypeController {
  constructor(private readonly businessType: BusinessTypeService) {}

  @Post()
  async create(
    @Body() createRequest: CreateBusinessTypeRequest,
  ): Promise<BusinessType> {
    return await this.businessType.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<BusinessType>> {
    const result = await this.businessType.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<BusinessType> {
    return this.businessType.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateBusinessTypeRequest,
  ): Promise<BusinessType> {
    return await this.businessType.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<BusinessType> {
    return await this.businessType.remove(id);
  }
}

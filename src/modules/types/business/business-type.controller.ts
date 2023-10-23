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
import { Business, BusinessType } from "@prisma/client";
import { BusinessService } from "@src/modules/business/business-profile.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { BusinessTypeService } from "./business-type.service";
import { CreateBusinessTypeRequest } from "./dtos/create-business-type.request";
import { UpdateBusinessTypeRequest } from "./dtos/update-business-type.request";

@Controller("types/business")
export class BusinessTypeController {
  constructor(
    private readonly businessTypeService: BusinessTypeService,
    private readonly businessService: BusinessService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateBusinessTypeRequest,
  ): Promise<BusinessType> {
    return await this.businessTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<BusinessType>,
  ): Promise<PaginationResponse<BusinessType>> {
    const result = await this.businessTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<BusinessType> {
    return this.businessTypeService.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateBusinessTypeRequest,
  ): Promise<BusinessType> {
    return await this.businessTypeService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<BusinessType> {
    return await this.businessTypeService.remove(id);
  }

  @Get(":id/business")
  async findManyBusiness(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Business>,
  ): Promise<PaginationResponse<Business>> {
    query.filters.businessTypeId = id;
    const result = await this.businessService.findMany(query);
    return result;
  }
}

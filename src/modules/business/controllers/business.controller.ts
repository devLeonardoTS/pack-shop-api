import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from "@nestjs/common";
import { Business } from "@prisma/client";
import { CommonQuery } from "../../common/dtos/common.query";
import { PaginationResponse } from "../../common/dtos/pagination.response";
import { BusinessService } from "../business-profile.service";
import { UpdateBusinessRequest } from "../dto/update-business.request";

@Controller("business")
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  async findMany(
    @Query() query: CommonQuery<Business>,
  ): Promise<PaginationResponse<Business>> {
    const result = await this.businessService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Business>,
  ): Promise<Business> {
    query.filters.id = id;
    return this.businessService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateBusinessRequest,
  ): Promise<Business> {
    const resource = await this.businessService.update(id, updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Business> {
    return await this.businessService.remove(id);
  }
}

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
import { BusinessOwner } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { BusinessOwnerService } from "./business-owner.service";
import { UpdateBusinessOwnerRequest } from "./dto/update-business-owner.request";

@Controller("business-owner")
export class BaseBusinessOwnerController {
  constructor(private readonly businessOwnerService: BusinessOwnerService) {}

  @Get()
  async findMany(
    @Query() query: CommonQuery<BusinessOwner>,
  ): Promise<PaginationResponse<BusinessOwner>> {
    const result = await this.businessOwnerService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<BusinessOwner>,
  ): Promise<BusinessOwner> {
    query.filters.id = id;
    return this.businessOwnerService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateBusinessOwnerRequest,
  ): Promise<BusinessOwner> {
    const resource = await this.businessOwnerService.update(id, updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<BusinessOwner> {
    return await this.businessOwnerService.remove(id);
  }
}

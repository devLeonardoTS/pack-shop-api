import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { BusinessOwner } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { BusinessOwnerService } from "../business-owner/business-owner.service";
import { CreateBusinessOwnerRequest } from "../business-owner/dto/create-business-owner.request";
import { BusinessService } from "../business-profile.service";

@Controller("business/:businessId/product")
export class BusinessOwnerController {
  constructor(
    private readonly businessOwnerService: BusinessOwnerService,
    private readonly businessService: BusinessService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param("businessId", ParseIntPipe) businessId: number,
    @Body() createRequest: CreateBusinessOwnerRequest,
  ): Promise<BusinessOwner> {
    createRequest.businessId = businessId;
    return await this.businessOwnerService.create(createRequest);
  }

  @Get()
  async findByParentId(
    @Param("businessId", ParseIntPipe) businessId: number,
    @Query() query: CommonQuery<BusinessOwner>,
  ): Promise<BusinessOwner> {
    query.filters.businessId = businessId;
    return await this.businessOwnerService.findOne(query);
  }
}

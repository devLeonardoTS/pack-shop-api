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
import { CreateBusinessProfileRequest } from "../dto/create-business-profile.request";
import { UpdateBusinessProfileRequest } from "../dto/update-business-profile.request";
import { BusinessProfile } from "../entities/business-profile.entity";
import { BusinessProfileService } from "../services/business-profile.service";

@Controller("business-profile")
export class BusinessProfileController {
  constructor(
    private readonly businessProfileService: BusinessProfileService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateBusinessProfileRequest,
  ): Promise<BusinessProfile> {
    return await this.businessProfileService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<BusinessProfile>> {
    const result = await this.businessProfileService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<BusinessProfile> {
    return this.businessProfileService.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateBusinessProfileRequest,
  ): Promise<BusinessProfile> {
    return await this.businessProfileService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<BusinessProfile> {
    return await this.businessProfileService.remove(id);
  }
}

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
import { Business, Consumer, Profile } from "@prisma/client";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { BusinessService } from "../../business/business-profile.service";
import { CommonQuery } from "../../common/dtos/common.query";
import { ConsumerService } from "../../consumer/consumer-profile.service";
import { UpdateProfileRequest } from "../dto/update-profile.request";
import { ProfileService } from "../profile.service";

@Controller("profile")
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly businessService: BusinessService,
    private readonly consumerService: ConsumerService,
  ) {}

  @Get()
  async findMany(
    @Query() query: CommonQuery<Profile>,
  ): Promise<PaginationResponse<Profile>> {
    const result = await this.profileService.findMany(query);
    return result;
  }

  @Get("business")
  async findManyBusiness(
    @Query() query: CommonQuery<Business>,
  ): Promise<PaginationResponse<Business>> {
    const result = await this.businessService.findMany(query);
    return result;
  }

  @Get("consumer")
  async findManyConsumer(
    @Query() query: CommonQuery<Consumer>,
  ): Promise<PaginationResponse<Consumer>> {
    const result = await this.consumerService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Profile> {
    return this.profileService.findOne({ filters: { id } });
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateProfileRequest,
  ): Promise<Profile> {
    const resource = await this.profileService.update(id, updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Profile> {
    return await this.profileService.remove(id);
  }
}

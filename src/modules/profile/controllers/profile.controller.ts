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
  Request,
  UseGuards,
} from "@nestjs/common";
import { Business, Consumer, Profile } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { BusinessService } from "../../business/business-profile.service";
import { CommonQuery } from "../../common/dtos/common.query";
import { ConsumerService } from "../../consumer/consumer-profile.service";
import { EAccountRoleType } from "../../types/account-role/account-role-type.enum";
import { CreateProfileRequest } from "../dto/create-profile.request";
import { UpdateProfileRequest } from "../dto/update-profile.request";
import { ProfileImageService } from "../image/profile-image.service";
import { ProfileService } from "../profile.service";

@Controller("profile")
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly businessService: BusinessService,
    private readonly consumerService: ConsumerService,
    private readonly profileImageService: ProfileImageService,
    private readonly db: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createRequest: CreateProfileRequest,
  ): Promise<Profile> {
    const isAdminRequest = req.user.roleType?.role === EAccountRoleType.ADMIN;
    if (!isAdminRequest) {
      createRequest.userAccountId = req.user.id;
    }

    return await this.profileService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
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
    return this.profileService.findById(id);
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
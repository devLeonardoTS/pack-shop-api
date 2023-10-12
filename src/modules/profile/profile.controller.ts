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
import { Business, Profile } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserAccountConstants } from "../user-account/constants/user-account.constants";
import { BusinessService } from "./business/business-profile.service";
import { CreateProfileRequest } from "./dto/create-profile.request";
import { UpdateProfileRequest } from "./dto/update-profile.request";
import { ProfileImageService } from "./image/profile-image.service";
import { ProfileService } from "./profile.service";

@Controller("profile")
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly businessService: BusinessService,
    private readonly profileImageService: ProfileImageService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createRequest: CreateProfileRequest,
  ): Promise<Profile> {
    const isAdminRequest =
      req.user.roleType?.role === UserAccountConstants.Roles.ADMIN;
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
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<Business>> {
    const result = await this.businessService.findMany(query);
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

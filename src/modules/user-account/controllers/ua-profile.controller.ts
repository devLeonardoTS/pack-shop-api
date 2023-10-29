import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Profile } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { CreateProfileRequest } from "@src/modules/profile/dto/create-profile.request";
import { ProfileService } from "@src/modules/profile/profile.service";

@Controller("user-account/:uaId/profile")
export class UserAccountProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param("uaId", ParseIntPipe) uaId: number,
    @Body() createRequest: CreateProfileRequest,
  ): Promise<Profile> {
    createRequest.userAccountId = uaId;
    return await this.profileService.create(createRequest);
  }

  @Get()
  async findByParentId(
    @Param("uaId", ParseIntPipe) uaId: number,
  ): Promise<Profile> {
    return this.profileService.findOne({ filters: { userAccountId: uaId } });
  }
}

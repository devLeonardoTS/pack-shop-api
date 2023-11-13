import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { Business } from "@prisma/client";
import { BusinessService } from "@src/modules/business/business-profile.service";
import { CreateBusinessRequest } from "@src/modules/business/dto/create-business.request";

@Controller("profile/:profileId/business")
export class ProfileBusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  async create(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() createRequest: CreateBusinessRequest,
  ): Promise<Business> {
    createRequest.profileId = profileId;
    return await this.businessService.create(createRequest);
  }

  @Get()
  async findByParentId(
    @Param("profileId", ParseIntPipe) profileId: number,
  ): Promise<Business> {
    return this.businessService.findOne({ filters: { profileId } });
  }
}

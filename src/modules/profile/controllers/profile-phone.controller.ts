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
import { Phone } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreatePhoneRequest } from "@src/modules/phone/dto/create-phone.request";
import { PhoneService } from "@src/modules/phone/phone.service";

@Controller("profile/:profileId/phone")
export class ProfilePhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() createRequest: CreatePhoneRequest,
  ): Promise<Phone> {
    createRequest.profileId = profileId;
    return await this.phoneService.create(createRequest);
  }

  @Get()
  async findMany(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Query() query: CommonQuery<Phone>,
  ): Promise<PaginationResponse<Phone>> {
    query.filters.profileId = profileId;
    const result = await this.phoneService.findMany(query);
    return result;
  }
}

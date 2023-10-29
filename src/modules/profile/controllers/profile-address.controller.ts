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
import { Address } from "@prisma/client";
import { AddressService } from "@src/modules/address/address.service";
import { CreateAddressRequest } from "@src/modules/address/dto/create-address.request";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";

@Controller("profile/:profileId/address")
export class ProfileAddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() createRequest: CreateAddressRequest,
  ): Promise<Address> {
    createRequest.profileId = profileId;
    return await this.addressService.create(createRequest);
  }

  @Get()
  async findMany(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Query() query: CommonQuery<Address>,
  ): Promise<PaginationResponse<Address>> {
    query.filters.profileId = profileId;
    const result = await this.addressService.findMany(query);
    return result;
  }
}

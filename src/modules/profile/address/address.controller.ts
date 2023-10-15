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
  UseGuards,
} from "@nestjs/common";
import { Address } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { AddressService } from "./address.service";
import { CreateAddressRequest } from "./dto/create-address.request";
import { UpdateAddressRequest } from "./dto/update-address.request";

@Controller("profile/:profileId/address")
export class AddressController {
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
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<Address>> {
    const result = await this.addressService.findMany(profileId, query);
    return result;
  }

  @Get()
  async findByOwnerId(
    @Param("profileId", ParseIntPipe) profileId: number,
  ): Promise<Address> {
    return this.addressService.findByOwnerId(profileId);
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Address> {
    return this.addressService.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateAddressRequest,
  ): Promise<Address> {
    const resource = await this.addressService.update(id, updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Address> {
    return await this.addressService.remove(id);
  }
}

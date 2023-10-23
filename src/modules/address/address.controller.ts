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
import { Address } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { AddressService } from "./address.service";
import { UpdateAddressRequest } from "./dto/update-address.request";

@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async findMany(
    @Query() query: CommonQuery<Address>,
  ): Promise<PaginationResponse<Address>> {
    const result = await this.addressService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Address>,
  ): Promise<Address> {
    query.filters.id = id;
    return this.addressService.findOne(query);
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

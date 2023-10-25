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
import { Phone } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { UpdatePhoneRequest } from "./dto/update-phone.request";
import { PhoneService } from "./phone.service";

@Controller("phone")
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get()
  async findMany(
    @Query() query: CommonQuery<Phone>,
  ): Promise<PaginationResponse<Phone>> {
    const result = await this.phoneService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Phone>,
  ): Promise<Phone> {
    query.filters.id = id;
    return this.phoneService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdatePhoneRequest,
  ): Promise<Phone> {
    const resource = await this.phoneService.update(id, updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Phone> {
    return await this.phoneService.remove(id);
  }
}

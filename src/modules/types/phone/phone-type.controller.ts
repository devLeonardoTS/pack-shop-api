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
} from "@nestjs/common";
import { Phone, PhoneType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { PhoneService } from "@src/modules/phone/phone.service";
import { CreatePhoneTypeRequest } from "./dtos/create-phone-type.request";
import { UpdatePhoneTypeRequest } from "./dtos/update-phone-type.request";
import { PhoneTypeService } from "./phone-type.service";

@Controller("types/phone")
export class PhoneTypeController {
  constructor(
    private readonly phoneTypeService: PhoneTypeService,
    private readonly phoneService: PhoneService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreatePhoneTypeRequest,
  ): Promise<PhoneType> {
    return await this.phoneTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<PhoneType>,
  ): Promise<PaginationResponse<PhoneType>> {
    const result = await this.phoneTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<PhoneType>,
  ): Promise<PhoneType> {
    query.filters.id = id;
    return this.phoneTypeService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdatePhoneTypeRequest,
  ): Promise<PhoneType> {
    return await this.phoneTypeService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<PhoneType> {
    return await this.phoneTypeService.remove(id);
  }

  @Get(":id/phone")
  async findManyPhone(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Phone>,
  ): Promise<PaginationResponse<Phone>> {
    query.filters.phoneTypeId = id;
    const result = await this.phoneService.findMany(query);
    return result;
  }
}

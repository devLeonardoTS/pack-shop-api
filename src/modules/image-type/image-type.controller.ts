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
import { ImageType } from "@prisma/client";
import { PaginationQuery } from "../common/dtos/pagination.query";
import { PaginationResponse } from "../common/dtos/pagination.response";
import { CreateImageTypeRequest } from "./dto/create-image-type.request";
import { UpdateImageTypeRequest } from "./dto/update-image-type.request";
import { ImageTypeService } from "./image-type.service";

@Controller("image-type")
export class ImageTypeController {
  constructor(private readonly imageTypeService: ImageTypeService) {}

  @Post()
  async create(
    @Body() createRequest: CreateImageTypeRequest,
  ): Promise<ImageType> {
    return await this.imageTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<ImageType>> {
    const result = await this.imageTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<ImageType> {
    return this.imageTypeService.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateImageTypeRequest,
  ): Promise<ImageType> {
    return await this.imageTypeService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ImageType> {
    return await this.imageTypeService.remove(id);
  }
}

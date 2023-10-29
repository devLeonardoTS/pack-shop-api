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
import { Image, ImageType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { ImageService } from "@src/modules/image/image.service";
import { CreateImageTypeRequest } from "./dtos/create-image-type.request";
import { UpdateImageTypeRequest } from "./dtos/update-image-type.request";
import { ImageTypeService } from "./image-type.service";

@Controller("types/image")
export class ImageTypeController {
  constructor(
    private readonly imageTypeService: ImageTypeService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateImageTypeRequest,
  ): Promise<ImageType> {
    return await this.imageTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<ImageType>,
  ): Promise<PaginationResponse<ImageType>> {
    const result = await this.imageTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<ImageType>,
  ): Promise<ImageType> {
    query.filters.id = id;
    return this.imageTypeService.findOne(query);
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

  @Get(":id/image")
  async findManyImage(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Image>,
  ): Promise<PaginationResponse<Image>> {
    query.filters.imageTypeId = id;
    const result = await this.imageService.findMany(query);
    return result;
  }
}

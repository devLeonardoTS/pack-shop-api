import {
  BadRequestException,
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
import { ProductTag, Tag } from "@prisma/client";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CommonQuery } from "../common/dtos/common.query";
import { ProductTagService } from "../product/tag/product-tag.service";
import { CreateTagRequest } from "./dto/create-tag.request";
import { UpdateTagRequest } from "./dto/update-tag.request";
import { TagService } from "./tag.service";

@Controller("tag")
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly productTagService: ProductTagService,
  ) {}

  @Post()
  async create(@Body() createRequest: CreateTagRequest): Promise<Tag> {
    return await this.tagService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<Tag>,
  ): Promise<PaginationResponse<Tag>> {
    const result = await this.tagService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Tag>,
  ): Promise<Tag> {
    query.filters.id = id;
    return this.tagService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateTagRequest,
  ): Promise<Tag> {
    return await this.tagService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Tag> {
    return await this.tagService.remove(id);
  }

  @Post("batch")
  async createMany(
    @Body() createRequest: CreateTagRequest,
  ): Promise<{ count: number }> {
    if (!createRequest.names) {
      throw new BadRequestException('"names" field is required.');
    }
    return await this.tagService.createMany(createRequest);
  }

  @Get(":id/product")
  async findManyProducts(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<ProductTag>,
  ): Promise<PaginationResponse<ProductTag>> {
    query.filters.tagId = id;
    const result = await this.productTagService.findMany(query);
    return result;
  }

  @Put(":id/hit")
  async addHit(@Param("id", ParseIntPipe) id: number): Promise<Tag> {
    return await this.tagService.incrementHit(id);
  }
}

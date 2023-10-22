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
import { Tag } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateTagRequest } from "../dto/create-tag.request";
import { UpdateTagRequest } from "../dto/update-tag.request";
import { TagService } from "../tag.service";

@Controller("product/tag")
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createRequest: CreateTagRequest): Promise<Tag> {
    return await this.tagService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<Tag>> {
    const result = await this.tagService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Tag> {
    return this.tagService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateTagRequest,
  ): Promise<Tag> {
    return await this.tagService.update(id, updateRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Tag> {
    return await this.tagService.remove(id);
  }
}

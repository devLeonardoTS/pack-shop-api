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
import { Category } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CategoryService } from "../category.service";
import { CreateCategoryRequest } from "../dto/create-category.request";
import { UpdateCategoryRequest } from "../dto/update-category.request";

@Controller("product/category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createRequest: CreateCategoryRequest,
  ): Promise<Category> {
    return await this.categoryService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<Category>> {
    const result = await this.categoryService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateCategoryRequest,
  ): Promise<Category> {
    return await this.categoryService.update(id, updateRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Category> {
    return await this.categoryService.remove(id);
  }
}

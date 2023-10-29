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
import { Category, ProductCategory } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { ProductCategoryService } from "../product/category/product-category.service";
import { CategoryService } from "./category.service";
import { CreateCategoryRequest } from "./dtos/create-category.request";
import { UpdateCategoryRequest } from "./dtos/update-category.request";

@Controller("category")
export class CategoryController {
  constructor(
    private readonly productTypeService: CategoryService,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateCategoryRequest,
  ): Promise<Category> {
    return await this.productTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<Category>,
  ): Promise<PaginationResponse<Category>> {
    const result = await this.productTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Category>,
  ): Promise<Category> {
    query.filters.id = id;
    return this.productTypeService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateCategoryRequest,
  ): Promise<Category> {
    return await this.productTypeService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Category> {
    return await this.productTypeService.remove(id);
  }

  @Get(":id/product")
  async findManyProducts(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<ProductCategory>,
  ): Promise<PaginationResponse<ProductCategory>> {
    query.filters.categoryId = id;
    const result = await this.productCategoryService.findMany(query);
    return result;
  }
}

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
import { ProductCategory } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductCategoryRequest } from "./dto/create-product-category.request";
import { UpdateProductCategoryRequest } from "./dto/update-product-category.request";
import { ProductCategoryService } from "./product-category.service";

@Controller("product/:productId/category")
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  async connect(
    @Param("productId", ParseIntPipe) productId: number,
    @Body() createRequest: CreateProductCategoryRequest,
  ): Promise<ProductCategory> {
    createRequest.productId = productId;
    return await this.productCategoryService.connect(createRequest);
  }

  @Get()
  async findMany(
    @Param("productId", ParseIntPipe) productId: number,
    @Query() query: CommonQuery<ProductCategory>,
  ): Promise<PaginationResponse<ProductCategory>> {
    query.filters.productId = productId;
    const result = await this.productCategoryService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<ProductCategory>,
  ): Promise<ProductCategory> {
    query.filters.id = id;
    return this.productCategoryService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateProductCategoryRequest,
  ): Promise<ProductCategory> {
    return await this.productCategoryService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ProductCategory> {
    return await this.productCategoryService.remove(id);
  }
}

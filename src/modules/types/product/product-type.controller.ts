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
import { Product, ProductType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { ProductService } from "@src/modules/product/product.service";
import { CreateProductTypeRequest } from "./dtos/create-product-type.request";
import { UpdateProductTypeRequest } from "./dtos/update-product-type.request";
import { ProductTypeService } from "./product-type.service";

@Controller("types/product")
export class ProductTypeController {
  constructor(
    private readonly productTypeService: ProductTypeService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateProductTypeRequest,
  ): Promise<ProductType> {
    return await this.productTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<ProductType>,
  ): Promise<PaginationResponse<ProductType>> {
    const result = await this.productTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<ProductType>,
  ): Promise<ProductType> {
    query.filters.id = id;
    return this.productTypeService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateProductTypeRequest,
  ): Promise<ProductType> {
    return await this.productTypeService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ProductType> {
    return await this.productTypeService.remove(id);
  }

  @Get(":id/product")
  async findManyProducts(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Product>,
  ): Promise<PaginationResponse<Product>> {
    query.filters.productTypeId = id;
    const result = await this.productService.findMany(query);
    return result;
  }
}

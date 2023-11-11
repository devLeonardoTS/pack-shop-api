import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { Product } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductRequest } from "@src/modules/product/dto/create-product.request";
import { ProductService } from "@src/modules/product/product.service";

@Controller("business/:businessId/product")
export class BusinessProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Param("businessId", ParseIntPipe) businessId: number,
    @Body() createRequest: CreateProductRequest,
  ): Promise<Product> {
    createRequest.businessId = businessId;
    return await this.productService.create(createRequest);
  }

  @Get()
  async findMany(
    @Param("businessId", ParseIntPipe) businessId: number,
    @Query() query: CommonQuery<Product>,
  ): Promise<PaginationResponse<Product>> {
    query.filters.businessId = businessId;
    return this.productService.findMany(query);
  }
}

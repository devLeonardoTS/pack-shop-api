import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Product } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductRequest } from "@src/modules/product/dto/create-product.request";
import { ProductService } from "@src/modules/product/product.service";

@Controller("business/:businessId/product")
export class BusinessProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param("businessId", ParseIntPipe) businessId: number,
    @Body() createRequest: CreateProductRequest,
  ): Promise<Product> {
    if (!createRequest.businessId) {
      createRequest.businessId = businessId;
    }
    return await this.productService.create(createRequest);
  }

  @Get()
  async findManyByParentId(
    @Param("businessId", ParseIntPipe) businessId: number,
    @Query() query: CommonQuery<Product>,
  ): Promise<PaginationResponse<Product>> {
    if (!query.filters.businessId) {
      query.filters.businessId = businessId;
    }
    return this.productService.findMany(query);
  }
}

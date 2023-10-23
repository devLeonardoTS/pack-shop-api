import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ProductCategory } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { ProductCategoryService } from "./product-category.service";

@Controller("product/:productId/category")
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  async findMany(
    @Param("productId", ParseIntPipe) productId: number,
    @Query() query: CommonQuery<ProductCategory>,
  ): Promise<PaginationResponse<ProductCategory>> {
    query.filters.productId = productId;
    const result = await this.productCategoryService.findMany(query);
    return result;
  }
}

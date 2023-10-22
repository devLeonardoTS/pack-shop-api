import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CategoryService } from "../category.service";

@Controller("product/:productId/category")
export class ProductCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findManyFromOwner(
    @Param("productId", ParseIntPipe) productId: number,
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<Category>> {
    const result = await this.categoryService.findManyFromProduct(
      productId,
      query,
    );
    return result;
  }
}

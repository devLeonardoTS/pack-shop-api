import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { Tag } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { TagService } from "../tag.service";

@Controller("product/:productId/tag")
export class ProductTagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findManyFromOwner(
    @Param("productId", ParseIntPipe) productId: number,
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<Tag>> {
    const result = await this.tagService.findManyFromProduct(productId, query);
    return result;
  }
}

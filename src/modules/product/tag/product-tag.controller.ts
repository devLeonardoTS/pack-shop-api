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
import { ProductTag } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductTagRequest } from "./dto/create-product-tag.request";
import { UpdateProductTagRequest } from "./dto/update-product-tag.request";
import { ProductTagService } from "./product-tag.service";

@Controller("product/:productId/tag")
export class ProductTagController {
  constructor(private readonly productTagService: ProductTagService) {}

  @Post()
  async connect(
    @Param("productId", ParseIntPipe) productId: number,
    @Body() createRequest: CreateProductTagRequest,
  ): Promise<ProductTag> {
    createRequest.productId = productId;
    return await this.productTagService.connect(createRequest);
  }

  @Get()
  async findMany(
    @Param("productId", ParseIntPipe) productId: number,
    @Query() query: CommonQuery<ProductTag>,
  ): Promise<PaginationResponse<ProductTag>> {
    query.filters.productId = productId;
    const result = await this.productTagService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<ProductTag>,
  ): Promise<ProductTag> {
    query.filters.id = id;
    return this.productTagService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateProductTagRequest,
  ): Promise<ProductTag> {
    return await this.productTagService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ProductTag> {
    return await this.productTagService.remove(id);
  }
}

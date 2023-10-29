import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from "@nestjs/common";
import { Product } from "@prisma/client";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CommonQuery } from "../common/dtos/common.query";
import { UpdateProductRequest } from "./dto/update-product.request";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findMany(
    @Query() query: CommonQuery<Product>,
  ): Promise<PaginationResponse<Product>> {
    const result = await this.productService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Product>,
  ): Promise<Product> {
    query.filters.id = id;
    return this.productService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateProductRequest,
  ): Promise<Product> {
    const resource = await this.productService.update(id, updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Product> {
    return await this.productService.remove(id);
  }
}

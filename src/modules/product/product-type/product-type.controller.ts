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
  UseGuards,
} from "@nestjs/common";
import { ProductType } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateProductTypeRequest } from "./dto/create-product-type.request";
import { UpdateProductTypeRequest } from "./dto/update-product-type.request";
import { ProductTypeService } from "./product-type.service";

@Controller("product/product-type")
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createRequest: CreateProductTypeRequest,
  ): Promise<ProductType> {
    return await this.productTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<ProductType>> {
    const result = await this.productTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<ProductType> {
    return this.productTypeService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateProductTypeRequest,
  ): Promise<ProductType> {
    return await this.productTypeService.update(id, updateRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ProductType> {
    return await this.productTypeService.remove(id);
  }
}

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
  Request,
  UseGuards,
} from "@nestjs/common";
import { Product } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateProductRequest } from "./dto/create-product.request";
import { UpdateProductRequest } from "./dto/update-product.request";
import { ProductService } from "./product.service";

@Controller("product")
export class BaseProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<Product>> {
    const result = await this.productService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findById(id);
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

@Controller("profile/:profileId/product")
export class ProfileProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() createRequest: CreateProductRequest,
  ): Promise<Product> {
    createRequest.businessId = profileId;
    return await this.productService.create(createRequest);
  }

  @Get()
  async findManyFromOwner(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<Product>> {
    const result = await this.productService.findManyFromOwner(
      profileId,
      query,
    );
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findById(id);
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

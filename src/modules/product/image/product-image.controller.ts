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
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductImage } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import {
  OptionalImageParseFilePipe,
  RequiredImageParseFilePipe,
} from "@src/modules/common/pipes/image-parse-file.pipe";
import { CreateProductImageRequest } from "./dto/create-product-image.request";
import { UpdateProductImageRequest } from "./dto/update-product-image.request";
import { ProductImageService } from "./product-image.service";

@Controller("product/:productId/image")
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Param("productId", ParseIntPipe) productId: number,
    @Body() createRequest: CreateProductImageRequest,
    @UploadedFile(new RequiredImageParseFilePipe()) file: Express.Multer.File,
  ): Promise<ProductImage> {
    createRequest.file = file;
    createRequest.productId = productId;
    return await this.productImageService.create(createRequest);
  }

  @Get()
  async findMany(
    @Param("productId", ParseIntPipe) productId: number,
    @Query() query: CommonQuery<ProductImage>,
  ): Promise<PaginationResponse<ProductImage>> {
    if (!query.filters.productId) {
      query.filters.productId = productId;
    }
    const result = await this.productImageService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<ProductImage>,
  ): Promise<ProductImage> {
    if (!query.filters.id) {
      query.filters.id = id;
    }
    return this.productImageService.findOne(query);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateProductImageRequest,
    @UploadedFile(new OptionalImageParseFilePipe()) file: Express.Multer.File,
  ): Promise<ProductImage> {
    updateRequest.file = file;
    updateRequest.resourceId = id;
    const resource = await this.productImageService.update(updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ProductImage> {
    return await this.productImageService.remove(id);
  }
}

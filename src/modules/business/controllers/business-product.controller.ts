import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Product } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
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
  async findByParentId(
    @Param("businessId", ParseIntPipe) businessId: number,
  ): Promise<Product> {
    return this.productService.findOne({ filters: { businessId } });
  }
}

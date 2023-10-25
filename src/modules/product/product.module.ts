import { Module } from "@nestjs/common";
import { ImageModule } from "../image/image.module";
import { UploadModule } from "../upload/upload.module";
import { PrismaProductCategoryRepository } from "./category/prisma-product-category.repository";
import { IProductCategoryRepository } from "./category/product-category-repository.interface";
import { ProductCategoryController } from "./category/product-category.controller";
import { ProductCategoryService } from "./category/product-category.service";
import { PrismaProductImageRepository } from "./image/prisma-product-image.repository";
import { ProductImageController } from "./image/product-image.controller";
import { IProductImageRepository } from "./image/product-image.interface";
import { ProductImageService } from "./image/product-image.service";
import { PrismaProductRepository } from "./prisma-product.repository";
import { IProductRepository } from "./product-repository.interface";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PrismaProductTagRepository } from "./tag/prisma-product-tag.repository";
import { IProductTagRepository } from "./tag/product-tag-repository.interface";
import { ProductTagController } from "./tag/product-tag.controller";
import { ProductTagService } from "./tag/product-tag.service";

@Module({
  controllers: [
    ProductTagController,
    ProductCategoryController,
    ProductController,
    ProductImageController,
  ],
  providers: [
    ProductTagService,
    ProductCategoryService,
    ProductService,
    ProductImageService,
    { provide: IProductTagRepository, useClass: PrismaProductTagRepository },
    {
      provide: IProductCategoryRepository,
      useClass: PrismaProductCategoryRepository,
    },
    { provide: IProductRepository, useClass: PrismaProductRepository },
    {
      provide: IProductImageRepository,
      useClass: PrismaProductImageRepository,
    },
  ],
  exports: [
    ProductService,
    ProductTagService,
    ProductCategoryService,
    ProductImageService,
  ],
  imports: [ImageModule, UploadModule],
})
export class ProductModule {}

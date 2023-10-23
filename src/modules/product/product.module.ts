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
import { ProductTagController } from "./tag/controllers/product-tag.controller";
import { TagController } from "./tag/controllers/tag.controller";
import { PrismaTagRepository } from "./tag/prisma-tag.repository";
import { ITagRepository } from "./tag/tag-repository.interface";
import { TagService } from "./tag/tag.service";

@Module({
  controllers: [
    TagController,
    ProductTagController,
    ProductCategoryController,
    ProductController,
    ProductImageController,
  ],
  providers: [
    TagService,
    ProductCategoryService,
    ProductService,
    ProductImageService,
    { provide: ITagRepository, useClass: PrismaTagRepository },
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
  exports: [ProductService],
  imports: [ImageModule, UploadModule],
})
export class ProductModule {}

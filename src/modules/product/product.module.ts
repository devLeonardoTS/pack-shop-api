import { Module } from "@nestjs/common";
import { ImageModule } from "../image/image.module";
import { UploadModule } from "../upload/upload.module";
import { ICategoryRepository } from "./category/category-repository.interface";
import { CategoryService } from "./category/category.service";
import { CategoryController } from "./category/controllers/category.controller";
import { ProductCategoryController } from "./category/controllers/product-category.controller";
import { PrismaCategoryRepository } from "./category/prisma-category.repository";
import { PrismaProductImageRepository } from "./image/prisma-product-image.repository";
import { ProductImageController } from "./image/product-image.controller";
import { IProductImageRepository } from "./image/product-image.interface";
import { ProductImageService } from "./image/product-image.service";
import { PrismaProductRepository } from "./prisma-product.repository";
import { IProductRepository } from "./product-repository.interface";
import { PrismaProductTypeRepository } from "./product-type/prisma-product-type.repository";
import { IProductTypeRepository } from "./product-type/product-type-repository.interface";
import { ProductTypeController } from "./product-type/product-type.controller";
import { ProductTypeService } from "./product-type/product-type.service";
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
    CategoryController,
    ProductCategoryController,
    ProductTypeController,
    ProductController,
    ProductImageController,
  ],
  providers: [
    TagService,
    CategoryService,
    ProductTypeService,
    ProductService,
    ProductImageService,
    { provide: ITagRepository, useClass: PrismaTagRepository },
    { provide: ICategoryRepository, useClass: PrismaCategoryRepository },
    { provide: IProductTypeRepository, useClass: PrismaProductTypeRepository },
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

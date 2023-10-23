import { Module } from "@nestjs/common";
import { ProductModule } from "@src/modules/product/product.module";
import { ICategoryRepository } from "./category-repository.interface";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { PrismaCategoryRepository } from "./prisma-category.repository";

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: ICategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [CategoryService],
  imports: [ProductModule],
})
export class CategoryModule {}

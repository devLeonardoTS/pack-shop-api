import { Module } from "@nestjs/common";
import { ProductModule } from "@src/modules/product/product.module";
import { PrismaProductTypeRepository } from "./prisma-product-type.repository";
import { IProductTypeRepository } from "./product-type-repository.interface";
import { ProductTypeController } from "./product-type.controller";
import { ProductTypeService } from "./product-type.service";

@Module({
  controllers: [ProductTypeController],
  providers: [
    ProductTypeService,
    {
      provide: IProductTypeRepository,
      useClass: PrismaProductTypeRepository,
    },
  ],
  exports: [ProductTypeService],
  imports: [ProductModule],
})
export class ProductTypeModule {}

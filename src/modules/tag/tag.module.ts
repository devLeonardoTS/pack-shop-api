import { Module } from "@nestjs/common";
import { ProductModule } from "../product/product.module";
import { PrismaTagRepository } from "./prisma-tag.repository";
import { ITagRepository } from "./tag-repository.interface";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";

@Module({
  controllers: [TagController],
  providers: [
    TagService,
    {
      provide: ITagRepository,
      useClass: PrismaTagRepository,
    },
  ],
  exports: [TagService],
  imports: [ProductModule],
})
export class TagModule {}

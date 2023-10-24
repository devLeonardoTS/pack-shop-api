import { Module } from "@nestjs/common";
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
})
export class TagModule {}

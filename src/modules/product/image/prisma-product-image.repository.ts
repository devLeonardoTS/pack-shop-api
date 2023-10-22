import { Injectable } from "@nestjs/common";
import { ProductImage } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { DatabaseException } from "@src/modules/common/exceptions/database.exception";
import { ImageService } from "@src/modules/image/image.service";
import { CreateProductImageRequest } from "./dto/create-product-image.request";
import { UpdateProductImageRequest } from "./dto/update-product-image.request";
import { IProductImageRepository } from "./product-image.interface";

@Injectable()
export class PrismaProductImageRepository implements IProductImageRepository {
  constructor(
    private readonly db: PrismaService,
    private readonly imageService: ImageService,
  ) {}

  async create(
    createRequest: CreateProductImageRequest,
  ): Promise<ProductImage> {
    const { file, productId, imageId, imageType } = createRequest;

    const uploadedImage = await this.imageService.create({ file, imageType });

    const attachedImage = await this.db.productImage
      .create({
        data: {
          productId,
          imageId: uploadedImage.id,
        },
        include: {
          image: { include: { imageType: true } },
        },
      })
      .catch(async (error) => {
        if (uploadedImage) {
          await this.imageService.remove(uploadedImage.id);
        }
        throw new DatabaseException();
      });

    return attachedImage;
  }

  async findById(resourceId: number): Promise<ProductImage> {
    const resource: ProductImage = await this.db.productImage.findFirst({
      where: { id: resourceId },
      include: {
        image: { include: { imageType: true } },
      },
    });
    return resource;
  }

  async findMany(
    commonQuery: CommonQuery<ProductImage>,
  ): Promise<ProductImage[]> {
    const {
      pagination: { limit, page },
      filters: { productId, ...otherFilters },
      orderBy,
    } = commonQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ProductImage[] = await this.db.productImage.findMany({
      take,
      skip,
      where: { productId: productId || 0, ...otherFilters },
      orderBy,
      include: {
        image: { include: { imageType: true } },
      },
    });

    return list;
  }

  async update(updateReq: UpdateProductImageRequest): Promise<ProductImage> {
    const { file, imageId, imageType, productId, resourceId } = updateReq;

    await this.imageService.update(imageId, { file, imageType });

    const updatedResource = await this.db.productImage.update({
      where: {
        id: resourceId || 0,
      },
      data: {
        imageId,
        productId,
      },
      include: {
        image: { include: { imageType: true } },
      },
    });

    return updatedResource;
  }

  async remove(resourceId: number): Promise<ProductImage> {
    const removed = await this.db.productImage.delete({
      where: { id: resourceId },
      include: {
        image: { include: { imageType: true } },
      },
    });

    if (removed) {
      await this.imageService.remove(removed.imageId);
    }

    return removed;
  }

  async countAll(): Promise<number> {
    return await this.db.productImage.count();
  }
}

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

    const sameTypeImage = await this.db.productImage.findFirst({
      where: {
        productId,
        image: {
          imageType: {
            type: imageType,
          },
        },
      },
    });

    if (sameTypeImage) {
      const updatedAttachedImage = await this.update({
        file,
        resourceId: sameTypeImage.id,
        imageType,
      });
      return updatedAttachedImage;
    }

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

  async findOne(commonQuery: CommonQuery<ProductImage>): Promise<ProductImage> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: ProductImage = await this.db.productImage.findFirst({
      where: filters,
      include: {
        image: { include: { imageType: true } },
        ...include,
      },
    });
    return item;
  }

  async findMany(
    commonQuery: CommonQuery<ProductImage>,
  ): Promise<ProductImage[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ProductImage[] = await this.db.productImage.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include: {
        image: { include: { imageType: true } },
        ...include,
      },
    });

    return list;
  }

  async update(updateReq: UpdateProductImageRequest): Promise<ProductImage> {
    const { file, imageType, resourceId } = updateReq;

    const resource = await this.findOne({
      filters: {
        id: resourceId,
      },
    });

    const uploaded = await this.imageService.update(resource.imageId, {
      file,
      imageType,
    });

    const updatedResource = await this.db.productImage.update({
      where: {
        id: resourceId,
      },
      data: {
        imageId: uploaded.id,
        productId: resource.productId,
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

  async countAll(filters: Partial<ProductImage>): Promise<number> {
    return await this.db.productImage.count({ where: filters });
  }
}

import { Injectable } from "@nestjs/common";
import { Image } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "../common/dtos/common.query";
import { DatabaseException } from "../common/exceptions/database.exception";
import { CloudinaryService } from "../upload/cloudinary/cloudinary.service";
import { CreateImageRequest } from "./dtos/create-image.request";
import { UpdateImageRequest } from "./dtos/update-image.request";
import { IImageRepository } from "./image-repository.interface";

@Injectable()
export class PrismaImageRepository implements IImageRepository {
  constructor(
    private readonly db: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createRequest: CreateImageRequest): Promise<Image> {
    const { file, imageType } = createRequest;

    const uploadedImage = await this.cloudinaryService.uploadFile(file);

    const created: Image = await this.db.image
      .create({
        data: {
          publicId: uploadedImage.public_id,
          height: uploadedImage.height,
          width: uploadedImage.width,
          imageUrl: uploadedImage.url,
          createdAt: uploadedImage.created_at,
          imageType: {
            connectOrCreate: {
              where: {
                type: imageType,
              },
              create: {
                type: imageType,
              },
            },
          },
        },
        include: { imageType: true },
      })
      .catch(async (error) => {
        if (uploadedImage) {
          await this.cloudinaryService.deleteFileByPublicId(
            uploadedImage.public_id,
          );
        }
        throw new DatabaseException();
      });

    return created;
  }

  async findMany(commonQuery: CommonQuery<Image>): Promise<Image[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Image[] = await this.db.image.findMany({
      take,
      skip,
      where: filters,
      orderBy,
      include,
    });

    return list;
  }

  async findOne(commonQuery: CommonQuery<Image>): Promise<Image> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: Image = await this.db.image.findFirst({
      where: filters,
      include,
    });
    return item;
  }

  async update(id: number, updateRequest: UpdateImageRequest): Promise<Image> {
    const { file, imageType } = updateRequest;

    const oldImage = await this.db.image.findFirst({ where: { id } });

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadFile(file);

      const updated: Image = await this.db.image
        .update({
          where: {
            id,
          },
          data: {
            publicId: uploadedImage.public_id,
            height: uploadedImage.height,
            width: uploadedImage.width,
            imageUrl: uploadedImage.url,
            createdAt: uploadedImage.created_at,
            imageType: imageType
              ? {
                  connectOrCreate: {
                    where: {
                      type: imageType,
                    },
                    create: {
                      type: imageType,
                    },
                  },
                }
              : undefined,
          },
          include: { imageType: true },
        })
        .catch(async (error) => {
          if (uploadedImage) {
            await this.cloudinaryService.deleteFileByPublicId(
              uploadedImage.public_id,
            );
          }
          throw new DatabaseException();
        });

      await this.cloudinaryService.deleteFileByPublicId(oldImage.publicId);

      return updated;
    }

    const updated: Image = await this.db.image.update({
      where: {
        id,
      },
      data: {
        imageType: imageType
          ? {
              connectOrCreate: {
                where: {
                  type: imageType,
                },
                create: {
                  type: imageType,
                },
              },
            }
          : undefined,
      },
      include: { imageType: true },
    });

    return updated;
  }

  async remove(id: number): Promise<Image> {
    const removed = await this.db.image.delete({
      where: { id },
      include: { imageType: true },
    });

    if (removed) {
      await this.cloudinaryService.deleteFileByPublicId(removed.publicId);
    }

    return removed;
  }

  async countAll(filters: Partial<Image>): Promise<number> {
    return await this.db.image.count({ where: filters });
  }
}

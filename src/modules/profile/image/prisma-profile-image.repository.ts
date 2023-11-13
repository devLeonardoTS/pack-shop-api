import { Injectable } from "@nestjs/common";
import { ProfileImage } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { DatabaseException } from "@src/modules/common/exceptions/database.exception";
import { ImageService } from "@src/modules/image/image.service";
import { CloudinaryService } from "@src/modules/upload/cloudinary/cloudinary.service";
import { CreateProfileImageRequest } from "./dto/create-profile-image.request";
import { UpdateProfileImageRequest } from "./dto/update-profile-image.request";
import { IProfileImageRepository } from "./profile-image.interface";

@Injectable()
export class PrismaProfileImageRepository implements IProfileImageRepository {
  constructor(
    private readonly db: PrismaService,
    private readonly imageService: ImageService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createRequest: CreateProfileImageRequest,
  ): Promise<ProfileImage> {
    const { profileId, file, imageType } = createRequest;

    const sameTypeImage = await this.db.profileImage.findFirst({
      where: {
        profileId,
        image: {
          imageType: {
            type: imageType,
          },
        },
      },
    });

    if (sameTypeImage) {
      const updated = await this.update({
        file,
        resourceId: sameTypeImage.id,
        imageType,
      });
      return updated;
    }

    const image = await this.imageService.create({ file, imageType });

    const profileImage = await this.db.profileImage
      .create({
        data: {
          profileId,
          imageId: image.id,
        },
        include: {
          image: { include: { imageType: true } },
        },
      })
      .catch(async (error) => {
        if (image) {
          await this.imageService.remove(image.id);
        }
        throw new DatabaseException();
      });

    return profileImage;
  }

  async findOne(commonQuery: CommonQuery<ProfileImage>): Promise<ProfileImage> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const item: ProfileImage = await this.db.profileImage.findFirst({
      where: filters,
      include: {
        image: { include: { imageType: true } },
        ...include,
      },
    });
    return item;
  }

  async findMany(
    commonQuery: CommonQuery<ProfileImage>,
  ): Promise<ProfileImage[]> {
    const { filters, orderBy, include } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ProfileImage[] = await this.db.profileImage.findMany({
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

  async update(updateReq: UpdateProfileImageRequest): Promise<ProfileImage> {
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

    const updatedResource = await this.db.profileImage.update({
      where: {
        id: resourceId,
      },
      data: {
        imageId: uploaded.id,
        profileId: resource.profileId,
      },
      include: {
        image: { include: { imageType: true } },
      },
    });

    return updatedResource;
  }

  async remove(id: number): Promise<ProfileImage> {
    const removed = await this.db.profileImage.delete({
      where: { id },
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
    return await this.db.profileImage.count();
  }
}

import { Injectable } from "@nestjs/common";
import { ProfileImage } from "@prisma/client";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
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

  async findMany(
    ownerId: number,
    paginationQuery: PaginationQuery,
  ): Promise<ProfileImage[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: ProfileImage[] = await this.db.profileImage.findMany({
      take,
      skip,
      where: { profileId: ownerId },
      include: {
        image: { include: { imageType: true } },
      },
    });

    return list;
  }

  async findById(id: number): Promise<ProfileImage> {
    const item: ProfileImage = await this.db.profileImage.findFirst({
      where: { id },
      include: {
        image: { include: { imageType: true } },
      },
    });
    return item;
  }

  async update(
    id: number,
    updateReq: UpdateProfileImageRequest,
  ): Promise<ProfileImage> {
    const { file, imageId, imageType, profileId } = updateReq;

    await this.imageService.update(imageId, { file, imageType });
    const profileImage = await this.db.profileImage.update({
      where: {
        id,
      },
      data: {
        imageId,
        profileId,
      },
      include: {
        image: { include: { imageType: true } },
      },
    });

    return profileImage;
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

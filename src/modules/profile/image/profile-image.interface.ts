import { ProfileImage } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateProfileImageRequest } from "./dto/create-profile-image.request";
import { UpdateProfileImageRequest } from "./dto/update-profile-image.request";

export interface IProfileImageRepository {
  create(createRequest: CreateProfileImageRequest): Promise<ProfileImage>;
  findOne(commonQuery: CommonQuery<ProfileImage>): Promise<ProfileImage>;
  findMany(commonQuery: CommonQuery<ProfileImage>): Promise<ProfileImage[]>;
  update(updateRequest: UpdateProfileImageRequest): Promise<ProfileImage>;
  remove(resourceId: number): Promise<ProfileImage>;
  countAll(filters: Partial<ProfileImage>): Promise<number>;
}

export const IProfileImageRepository = Symbol("IProfileImageRepository");

import { ProfileImage } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateProfileImageRequest } from "./dto/create-profile-image.request";
import { UpdateProfileImageRequest } from "./dto/update-profile-image.request";

export interface IProfileImageRepository {
  create(createRequest: CreateProfileImageRequest): Promise<ProfileImage>;
  findMany(
    ownerId: number,
    paginationQuery: PaginationQuery,
  ): Promise<ProfileImage[]>;
  findById(id: number): Promise<ProfileImage>;
  update(
    id: number,
    updateReq: UpdateProfileImageRequest,
  ): Promise<ProfileImage>;
  remove(id: number): Promise<ProfileImage>;
  countAll(): Promise<number>;
}

export const IProfileImageRepository = Symbol("IProfileImageRepository");

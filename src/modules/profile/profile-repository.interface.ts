import { Profile } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateProfileRequest } from "./dto/create-profile.request";
import { UpdateProfileRequest } from "./dto/update-profile.request";

export interface IProfileRepository {
  create(createRequest: CreateProfileRequest): Promise<Profile>;
  findMany(paginationQuery: PaginationQuery): Promise<Profile[]>;
  findById(id: number): Promise<Profile>;
  findByOwnerId(userAccountId: number): Promise<Profile>;
  update(id: number, updateReq: UpdateProfileRequest): Promise<Profile>;
  remove(id: number): Promise<Profile>;
  countAll(): Promise<number>;
}

export const IProfileRepository = Symbol("IProfileRepository");

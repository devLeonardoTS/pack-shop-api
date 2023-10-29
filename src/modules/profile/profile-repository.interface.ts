import { Profile } from "@prisma/client";
import { CommonQuery } from "../common/dtos/common.query";
import { CreateProfileRequest } from "./dto/create-profile.request";
import { UpdateProfileRequest } from "./dto/update-profile.request";

export interface IProfileRepository {
  create(createRequest: CreateProfileRequest): Promise<Profile>;
  findMany(commonQuery: CommonQuery<Profile>): Promise<Profile[]>;
  findOne(commonQuery: CommonQuery<Profile>): Promise<Profile>;
  update(id: number, updateReq: UpdateProfileRequest): Promise<Profile>;
  remove(id: number): Promise<Profile>;
  countAll(filters: Partial<Profile>): Promise<number>;
}

export const IProfileRepository = Symbol("IProfileRepository");

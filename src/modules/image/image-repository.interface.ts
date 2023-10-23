import { Image } from "@prisma/client";
import { CommonQuery } from "../common/dtos/common.query";
import { CreateImageRequest } from "./dtos/create-image.request";
import { UpdateImageRequest } from "./dtos/update-image.request";

export interface IImageRepository {
  create(createRequest: CreateImageRequest): Promise<Image>;
  findMany(commonQuery: CommonQuery<Image>): Promise<Image[]>;
  findOne(commonQuery: CommonQuery<Image>): Promise<Image>;
  update(id: number, updateReq: UpdateImageRequest): Promise<Image>;
  remove(id: number): Promise<Image>;
  countAll(filters: Partial<Image>): Promise<number>;
}

export const IImageRepository = Symbol("IImageRepository");

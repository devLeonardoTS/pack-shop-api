import { ImageType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateImageTypeRequest } from "./dtos/create-image-type.request";
import { UpdateImageTypeRequest } from "./dtos/update-image-type.request";

export interface IImageTypeRepository {
  create(createRequest: CreateImageTypeRequest): Promise<ImageType>;
  findMany(commonQuery: CommonQuery<ImageType>): Promise<ImageType[]>;
  findOne(commonQuery: CommonQuery<ImageType>): Promise<ImageType>;
  update(id: number, updateReq: UpdateImageTypeRequest): Promise<ImageType>;
  remove(id: number): Promise<ImageType>;
  countAll(filters: Partial<ImageType>): Promise<number>;
}

export const IImageTypeRepository = Symbol("IImageTypeRepository");

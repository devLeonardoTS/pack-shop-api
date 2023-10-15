import { ImageType } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateImageTypeRequest } from "../dto/create-image-type.request";
import { UpdateImageTypeRequest } from "../dto/update-image-type.request";

export interface IImageTypeRepository {
  create(createRequest: CreateImageTypeRequest): Promise<ImageType>;
  findMany(paginationQuery: PaginationQuery): Promise<ImageType[]>;
  findById(id: number): Promise<ImageType>;
  update(id: number, updateReq: UpdateImageTypeRequest): Promise<ImageType>;
  remove(id: number): Promise<ImageType>;
  countAll(): Promise<number>;
}

export const IImageTypeRepository = Symbol("IImageTypeRepository");

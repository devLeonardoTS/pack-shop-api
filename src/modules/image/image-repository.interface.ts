import { Image } from "@prisma/client";
import { CreateImageRequest } from "./create-image.request";
import { UpdateImageRequest } from "./update-image.request";

export interface IImageRepository {
  create(createRequest: CreateImageRequest): Promise<Image>;
  findById(id: number): Promise<Image>;
  findByPublicId(publicId: string): Promise<Image>;
  update(id: number, updateRequest: UpdateImageRequest);
  remove(id: number): Promise<Image>;
  countAll(): Promise<number>;
}

export const IImageRepository = Symbol("IImageRepository");

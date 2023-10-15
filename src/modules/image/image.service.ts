import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Image } from "@prisma/client";
import { CreateImageRequest } from "./create-image.request";
import { IImageRepository } from "./image-repository.interface";
import { UpdateImageRequest } from "./update-image.request";

@Injectable()
export class ImageService {
  constructor(
    @Inject(IImageRepository)
    private readonly imageRepository: IImageRepository,
  ) {}

  async create(createRequest: CreateImageRequest): Promise<Image> {
    const resource = await this.imageRepository.create(createRequest);

    return resource;
  }

  async findById(id: number): Promise<Image> {
    const resource = await this.imageRepository.findById(id);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async findByPublicId(publicId: string): Promise<Image> {
    const resource = await this.imageRepository.findByPublicId(publicId);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async update(id: number, updateRequest: UpdateImageRequest): Promise<Image> {
    const resource = await this.imageRepository.update(id, updateRequest);

    if (!resource) {
      throw new NotFoundException();
    }

    return resource;
  }

  async remove(id: number): Promise<Image> {
    const removed = await this.imageRepository.remove(id);
    return removed;
  }
}

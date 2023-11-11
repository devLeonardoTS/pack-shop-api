import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProfileImage } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import {
  OptionalImageParseFilePipe,
  RequiredImageParseFilePipe,
} from "@src/modules/common/pipes/image-parse-file.pipe";
import { CreateProfileImageRequest } from "./dto/create-profile-image.request";
import { UpdateProfileImageRequest } from "./dto/update-profile-image.request";
import { ProfileImageService } from "./profile-image.service";

@Controller("profile/:profileId/image")
export class ProfileImageController {
  constructor(private readonly profileImageService: ProfileImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() createRequest: CreateProfileImageRequest,
    @UploadedFile(new RequiredImageParseFilePipe()) file: Express.Multer.File,
  ): Promise<ProfileImage> {
    createRequest.file = file;
    createRequest.profileId = profileId;
    return await this.profileImageService.create(createRequest);
  }

  @Get()
  async findMany(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Query() query: CommonQuery<ProfileImage>,
  ): Promise<PaginationResponse<ProfileImage>> {
    query.filters.profileId = profileId;
    const result = await this.profileImageService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<ProfileImage>,
  ): Promise<ProfileImage> {
    query.filters.id = id;
    return this.profileImageService.findOne(query);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateProfileImageRequest,
    @UploadedFile(new OptionalImageParseFilePipe()) file: Express.Multer.File,
  ): Promise<ProfileImage> {
    updateRequest.file = file;
    updateRequest.resourceId = id;
    const resource = await this.profileImageService.update(updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ProfileImage> {
    return await this.profileImageService.remove(id);
  }
}

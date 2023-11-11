import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProfileImageRequest {
  @IsOptional()
  @IsString()
  imageType?: string;

  @IsOptional()
  file?: Express.Multer.File;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profileId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  imageId?: number;
}

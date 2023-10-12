import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProfileImageRequest {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profileId?: number;

  @IsOptional()
  file?: Express.Multer.File;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  imageId?: number;

  @IsOptional()
  @IsString()
  imageType?: string;
}

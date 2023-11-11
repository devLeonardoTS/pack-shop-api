import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductImageRequest {
  @IsNotEmpty()
  @IsString()
  imageType: string;

  @IsOptional()
  file?: Express.Multer.File;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  productId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  imageId?: number;
}

import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductImageRequest {
  @IsNotEmpty()
  file: Express.Multer.File;

  @IsNotEmpty()
  @IsString()
  imageType: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  productId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  imageId?: number;
}

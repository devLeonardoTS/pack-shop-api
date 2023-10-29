import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { CreateProductImageRequest } from "./create-product-image.request";

export class UpdateProductImageRequest extends PartialType(
  CreateProductImageRequest,
) {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  resourceId?: number;
}

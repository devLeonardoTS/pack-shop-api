import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateProductTagRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  tagId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  productId?: number;
}

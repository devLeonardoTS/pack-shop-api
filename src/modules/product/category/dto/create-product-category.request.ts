import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateProductCategoryRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  productId?: number;
}

import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class CreateProductCategoryRequest {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  productId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;
}

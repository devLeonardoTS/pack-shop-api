import { EProductType } from "@src/modules/types/product/product-type.enum";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateProductRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  sku: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  brand: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  weightKg: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  lengthCm: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  heightCm: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  widthCm: number;

  @IsNotEmpty()
  @IsDateString()
  manufacturedAt: Date;

  @IsNotEmpty()
  @IsDateString()
  expiresAt: Date;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isAvailable?: boolean;

  @IsNotEmpty()
  @IsEnum(EProductType)
  productType: string;

  @IsNotEmpty()
  @Transform(({ value }) =>
    String(value)
      .split(";")
      .map((value) => value.trim()),
  )
  @IsArray()
  productCategories: string[];

  @IsNotEmpty()
  @Transform(({ value }) =>
    String(value)
      .split(";")
      .map((value) => value.trim()),
  )
  @IsArray()
  productTags: string[];

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  businessId?: number;
}

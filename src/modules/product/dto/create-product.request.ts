import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDecimal,
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
  @IsDecimal()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsDecimal()
  weightKg: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsDecimal()
  lengthCm: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsDecimal()
  heightCm: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsDecimal()
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
  @IsString()
  productType: string;

  @IsNotEmpty()
  @Transform(({ value }) => String(value).split(";"))
  @IsArray()
  productCategories: string[];

  @IsNotEmpty()
  @Transform(({ value }) => String(value).split(";"))
  @IsArray()
  productTags: string[];

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  profileId?: number;
}
